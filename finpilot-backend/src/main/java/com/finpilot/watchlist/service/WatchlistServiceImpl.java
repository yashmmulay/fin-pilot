package com.finpilot.watchlist.service;

import com.finpilot.common.exception.DuplicateResourceException;
import com.finpilot.common.exception.ResourceNotFoundException;
import com.finpilot.common.util.ExchangeResolver;
import com.finpilot.marketdata.entity.MarketPriceCache;
import com.finpilot.marketdata.service.MarketCacheService;
import com.finpilot.user.entity.User;
import com.finpilot.watchlist.dto.AddWatchlistRequest;
import com.finpilot.watchlist.dto.WatchlistResponse;
import com.finpilot.watchlist.entity.Watchlist;
import com.finpilot.watchlist.repository.WatchlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WatchlistServiceImpl implements WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final MarketCacheService marketCacheService;
    private final ExchangeResolver exchangeResolver;

    @Override
    public WatchlistResponse addToWatchlist(
            User user,
            AddWatchlistRequest request) {

        String exchange = exchangeResolver.resolve(
                request.getExchange(),
                request.getAssetType()
        );

        if (watchlistRepository.existsByUserAndAssetSymbolAndExchangeAndAssetType(
                user,
                request.getAssetSymbol(),
                exchange,
                request.getAssetType())) {

            throw new DuplicateResourceException(
                    "Asset already exists in watchlist"
            );
        }

        // Create or refresh cache
        marketCacheService.getLatestMarketPrice(
                request.getAssetSymbol(),
                request.getAssetName(),
                exchange,
                request.getAssetType()
        );

        Watchlist watchlist = Watchlist.builder()
                .user(user)
                .assetSymbol(request.getAssetSymbol())
                .assetName(request.getAssetName())
                .exchange(exchange)
                .assetType(request.getAssetType())
                .build();

        Watchlist savedWatchlist = watchlistRepository.save(watchlist);

        return mapToResponse(savedWatchlist);
    }

    @Override
    public List<WatchlistResponse> getUserWatchlist(User user) {

        return watchlistRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void removeFromWatchlist(
            User user,
            UUID watchlistId) {

        Watchlist watchlist = watchlistRepository
                .findByIdAndUser(watchlistId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Watchlist item not found"));

        watchlistRepository.delete(watchlist);
    }

    private WatchlistResponse mapToResponse(Watchlist watchlist) {

        MarketPriceCache marketPrice =
                marketCacheService.getLatestMarketPrice(
                        watchlist.getAssetSymbol(),
                        watchlist.getExchange(),
                        watchlist.getAssetType()
                );

        return WatchlistResponse.builder()
                .id(watchlist.getId())
                .assetSymbol(watchlist.getAssetSymbol())
                .assetName(watchlist.getAssetName())
                .assetType(watchlist.getAssetType())
                .currentPrice(marketPrice.getCurrentPrice())
                .currency(marketPrice.getCurrency())
                .exchange(marketPrice.getExchange())
                .createdAt(watchlist.getCreatedAt())
                .build();
    }
}