package com.finpilot.portfolio.service;

import com.finpilot.common.PortfolioNotFoundException;
import com.finpilot.common.enums.AssetType;
import com.finpilot.common.util.ExchangeResolver;
import com.finpilot.marketdata.entity.MarketPriceCache;
import com.finpilot.marketdata.service.MarketCacheService;
import com.finpilot.portfolio.dto.PortfolioRequest;
import com.finpilot.portfolio.dto.PortfolioResponse;
import com.finpilot.portfolio.entity.Portfolio;
import com.finpilot.portfolio.mapper.PortfolioMapper;
import com.finpilot.portfolio.repository.PortfolioRepository;
import com.finpilot.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.finpilot.portfolio.exception.InvalidExchangeException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class PortfolioServiceImpl implements PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final MarketCacheService marketCacheService;
    private final ExchangeResolver exchangeResolver;

    @Override
    public PortfolioResponse addAsset(User user, PortfolioRequest request) {

        String exchange = exchangeResolver.resolve(
                request.getExchange(),
                request.getAssetType()
        );

        MarketPriceCache marketPrice = marketCacheService.getLatestMarketPrice(
                request.getAssetSymbol(),
                request.getAssetName(),
                exchange,
                request.getAssetType()
        );

        return portfolioRepository
                .findByUserAndAssetSymbolAndExchangeAndAssetType(
                        user,
                        request.getAssetSymbol(),
                        exchange,
                        request.getAssetType()
                )
                .map(existingPortfolio -> {

                    BigDecimal existingQuantity = existingPortfolio.getQuantity();
                    BigDecimal newQuantity = request.getQuantity();

                    BigDecimal totalQuantity = existingQuantity.add(newQuantity);

                    BigDecimal totalInvestment =
                            existingPortfolio.getPurchasePrice()
                                    .multiply(existingQuantity)
                                    .add(request.getPurchasePrice().multiply(newQuantity));

                    BigDecimal averagePurchasePrice =
                            totalInvestment.divide(totalQuantity, 4, RoundingMode.HALF_UP);

                    existingPortfolio.setQuantity(totalQuantity);
                    existingPortfolio.setPurchasePrice(averagePurchasePrice);
                    existingPortfolio.setCurrentPrice(marketPrice.getCurrentPrice());

                    Portfolio updatedPortfolio =
                            portfolioRepository.save(existingPortfolio);

                    return PortfolioMapper.toResponse(updatedPortfolio);
                })
                .orElseGet(() -> {

                    Portfolio portfolio = PortfolioMapper.toEntity(request, user);
                    portfolio.setExchange(exchange);
                    portfolio.setCurrentPrice(marketPrice.getCurrentPrice());

                    Portfolio savedPortfolio = portfolioRepository.save(portfolio);

                    return PortfolioMapper.toResponse(savedPortfolio);
                });
    }

    @Override
    @Transactional(readOnly = true)
    public List<PortfolioResponse> getPortfolio(User user) {

        return portfolioRepository.findByUserOrderByUpdatedAtDesc(user)
                .stream()
                .map(PortfolioMapper::toResponse)
                .toList();
    }

    @Override
    public PortfolioResponse updateAsset(
            User user,
            UUID portfolioId,
            PortfolioRequest request) {

        Portfolio portfolio = portfolioRepository
                .findByIdAndUser(portfolioId, user)
                .orElseThrow(() -> new PortfolioNotFoundException(portfolioId));

        String exchange = resolveExchange(request);

        MarketPriceCache marketPrice = marketCacheService.getLatestMarketPrice(
                request.getAssetSymbol(),
                request.getAssetName(),
                exchange,
                request.getAssetType()
        );

        portfolio.setAssetSymbol(request.getAssetSymbol());
        portfolio.setAssetName(request.getAssetName());
        portfolio.setExchange(exchange);
        portfolio.setAssetType(request.getAssetType());
        portfolio.setQuantity(request.getQuantity());
        portfolio.setPurchasePrice(request.getPurchasePrice());
        portfolio.setCurrentPrice(marketPrice.getCurrentPrice());
        portfolio.setPurchaseDate(request.getPurchaseDate());

        Portfolio updated = portfolioRepository.save(portfolio);

        return PortfolioMapper.toResponse(updated);
    }

    @Override
    public void deleteAsset(User user, UUID portfolioId) {

        Portfolio portfolio = portfolioRepository
                .findByIdAndUser(portfolioId, user)
                .orElseThrow(() -> new PortfolioNotFoundException(portfolioId));

        portfolioRepository.delete(portfolio);
    }

    private String resolveExchange(PortfolioRequest request) {

        if (request.getAssetType() == AssetType.MUTUAL_FUND) {
            return "MF";
        }

        if (request.getExchange() == null || request.getExchange().isBlank()) {
            throw new InvalidExchangeException(
                    "Exchange is required for STOCK and ETF."
            );
        }

        return request.getExchange().trim().toUpperCase();
    }
}
