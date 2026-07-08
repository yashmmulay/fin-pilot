package com.finpilot.portfolio.service;

import com.finpilot.common.enums.AssetType;
import com.finpilot.common.util.CurrencyConverter;
import com.finpilot.marketdata.entity.MarketPriceCache;
import com.finpilot.marketdata.service.MarketCacheService;
import com.finpilot.portfolio.dto.PortfolioAllocationResponse;
import com.finpilot.portfolio.dto.PortfolioSummaryResponse;
import com.finpilot.portfolio.repository.PortfolioRepository;
import com.finpilot.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PortfolioAnalyticsServiceImpl implements PortfolioAnalyticsService {

    private final PortfolioRepository portfolioRepository;
    private final MarketCacheService marketCacheService;
    private final CurrencyConverter currencyConverter;

    @Override
    public PortfolioSummaryResponse getPortfolioSummary(User user) {

        var portfolioList = portfolioRepository.findByUserOrderByUpdatedAtDesc(user);

        BigDecimal totalInvestment = BigDecimal.ZERO;
        BigDecimal currentValue = BigDecimal.ZERO;

        for (var portfolio : portfolioList) {

            BigDecimal investment = portfolio.getPurchasePrice()
                    .multiply(portfolio.getQuantity());

            investment = currencyConverter.convertToINR(
                    investment,
                    getCurrency(portfolio)
            );

            MarketPriceCache marketPrice = marketCacheService.getLatestMarketPrice(
                    portfolio.getAssetSymbol(),
                    portfolio.getExchange(),
                    portfolio.getAssetType()
            );

            BigDecimal current = marketPrice.getCurrentPrice()
                    .multiply(portfolio.getQuantity());

            current = currencyConverter.convertToINR(
                    current,
                    marketPrice.getCurrency()
            );

            totalInvestment = totalInvestment.add(investment);
            currentValue = currentValue.add(current);
        }

        BigDecimal totalProfitLoss = currentValue.subtract(totalInvestment);

        BigDecimal returnPercentage = BigDecimal.ZERO;

        if (totalInvestment.compareTo(BigDecimal.ZERO) > 0) {
            returnPercentage = totalProfitLoss.multiply(BigDecimal.valueOf(100))
                    .divide(totalInvestment, 2, RoundingMode.HALF_UP);
        }

        return PortfolioSummaryResponse.builder()
                .totalInvestment(totalInvestment)
                .currentValue(currentValue)
                .totalProfitLoss(totalProfitLoss)
                .returnPercentage(returnPercentage)
                .assetCount(portfolioList.size())
                .build();
    }

    @Override
    public List<PortfolioAllocationResponse> getPortfolioAllocation(User user) {

        var portfolioList = portfolioRepository.findByUserOrderByUpdatedAtDesc(user);

        Map<AssetType, BigDecimal> allocationMap = new EnumMap<>(AssetType.class);
        BigDecimal totalPortfolioValue = BigDecimal.ZERO;

        for (var portfolio : portfolioList) {

            MarketPriceCache marketPrice = marketCacheService.getLatestMarketPrice(
                    portfolio.getAssetSymbol(),
                    portfolio.getExchange(),
                    portfolio.getAssetType()
            );

            BigDecimal currentValue = marketPrice.getCurrentPrice()
                    .multiply(portfolio.getQuantity());

            currentValue = currencyConverter.convertToINR(
                    currentValue,
                    marketPrice.getCurrency()
            );

            allocationMap.merge(
                    portfolio.getAssetType(),
                    currentValue,
                    BigDecimal::add
            );

            totalPortfolioValue = totalPortfolioValue.add(currentValue);
        }

        List<PortfolioAllocationResponse> response = new ArrayList<>();

        for (Map.Entry<AssetType, BigDecimal> entry : allocationMap.entrySet()) {

            double percentage = 0.0;

            if (totalPortfolioValue.compareTo(BigDecimal.ZERO) > 0) {
                percentage = entry.getValue()
                        .multiply(BigDecimal.valueOf(100))
                        .divide(totalPortfolioValue, 2, RoundingMode.HALF_UP)
                        .doubleValue();
            }

            response.add(
                    PortfolioAllocationResponse.builder()
                            .assetType(entry.getKey())
                            .currentValue(entry.getValue())
                            .percentage(percentage)
                            .build()
            );
        }

        return response;
    }

    private String getCurrency(com.finpilot.portfolio.entity.Portfolio portfolio) {

        if (portfolio.getAssetType() == AssetType.MUTUAL_FUND) {
            return "INR";
        }

        String exchange = portfolio.getExchange();

        if (exchange != null) {
            exchange = exchange.toUpperCase();
            if (exchange.equals("NSE") || exchange.equals("BSE") || exchange.equals("MF")) {
                return "INR";
            }
        }

        return "USD";
    }
}
