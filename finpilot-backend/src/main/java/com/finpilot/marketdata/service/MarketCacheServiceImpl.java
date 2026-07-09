package com.finpilot.marketdata.service;

import com.finpilot.common.enums.AssetType;
import com.finpilot.marketdata.dto.MarketQuote;
import com.finpilot.marketdata.entity.MarketPriceCache;
import com.finpilot.marketdata.exception.MarketDataUnavailableException;
import com.finpilot.marketdata.repository.MarketPriceCacheRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MarketCacheServiceImpl implements MarketCacheService {

    private static final Duration CACHE_TTL = Duration.ofMinutes(15);

    private final MarketPriceCacheRepository cacheRepository;
    private final MarketDataService marketDataService;

    @Override
    public MarketPriceCache getLatestMarketPrice(
            String symbol,
            String companyName,
            String exchange,
            AssetType assetType) {

        return cacheRepository.findBySymbolAndExchange(symbol, exchange)
                .map(cache -> {

                    if (isCacheFresh(cache)) {

                        log.debug("Using fresh cache for {}:{}", exchange, symbol);
                        return cache;

                    }

                    log.info("Cache expired for {}:{}, refreshing...", exchange, symbol);

                    return refreshCache(cache, assetType);

                })
                .orElseGet(() -> {

                    log.info("No cache found for {}:{}, fetching from provider...", exchange, symbol);

                    return createCache(symbol, companyName, exchange, assetType);

                });
    }

    @Override
    public MarketPriceCache getLatestMarketPrice(
            String symbol,
            String exchange,
            AssetType assetType) {

        return cacheRepository.findBySymbolAndExchange(symbol, exchange)
                .map(cache -> {

                    if (isCacheFresh(cache)) {

                        log.debug("Using fresh cache for {}:{}", exchange, symbol);
                        return cache;

                    }

                    log.info("Cache expired for {}:{}, refreshing...", exchange, symbol);

                    return refreshCache(cache, assetType);

                })
                .orElseGet(() -> {

                    log.info("No cache found for {}:{}, fetching from provider...", exchange, symbol);

                    return createCache(symbol, null, exchange, assetType);

                });
    }

    private boolean isCacheFresh(MarketPriceCache cache) {

        return cache.getLastUpdated() != null &&
                cache.getLastUpdated().isAfter(
                        LocalDateTime.now().minus(CACHE_TTL)
                );

    }

    /**
     * Refreshes an existing cache entry.
     *
     * If the provider fails (rate limit, outage, etc.),
     * the stale cache is returned instead of failing the request.
     */
    private MarketPriceCache refreshCache(
            MarketPriceCache cache,
            AssetType assetType) {

        try {

            MarketQuote quote = marketDataService.fetchLatestPrice(
                    cache.getSymbol(),
                    cache.getExchange(),
                    assetType
            );

            cache.setCurrentPrice(quote.getCurrentPrice());
            cache.setCurrency(quote.getCurrency());
            cache.setLastUpdated(quote.getLastUpdated());
            cache.setSource(quote.getSource());

            log.info("Market cache refreshed for {}:{}",
                    cache.getExchange(),
                    cache.getSymbol());

            return cacheRepository.save(cache);

        } catch (Exception ex) {

            log.warn(
                    "Unable to refresh {}:{} from provider. Returning stale cached price.",
                    cache.getExchange(),
                    cache.getSymbol(),
                    ex
            );

            return cache;
        }
    }

    /**
     * Creates a cache entry.
     *
     * If this is the first request for an asset and the provider
     * fails, the request fails because no cached value exists.
     */
    private MarketPriceCache createCache(
            String symbol,
            String companyName,
            String exchange,
            AssetType assetType) {
    
        try {
    
            MarketQuote quote = marketDataService.fetchLatestPrice(
                    symbol,
                    exchange,
                    assetType
            );
    
            String finalCompanyName =
                    companyName != null && !companyName.isBlank()
                            ? companyName
                            : quote.getCompanyName() != null && !quote.getCompanyName().isBlank()
                                    ? quote.getCompanyName()
                                    : symbol.toUpperCase();
    
            MarketPriceCache cache = MarketPriceCache.builder()
                    .symbol(quote.getSymbol())
                    .exchange(quote.getExchange())
                    .assetType(quote.getAssetType())
                    .companyName(finalCompanyName)
                    .currency(quote.getCurrency())
                    .currentPrice(quote.getCurrentPrice())
                    .lastUpdated(quote.getLastUpdated())
                    .source(quote.getSource())
                    .build();
    
            log.info("Created market cache for {}:{}", exchange, symbol);
    
            return cacheRepository.save(cache);
    
        } catch (Exception ex) {
    
            log.error(
                    "Unable to create market cache for {}:{}",
                    exchange,
                    symbol,
                    ex
            );
    
            throw new MarketDataUnavailableException(
                    "Unable to fetch market data for " + symbol,
                    ex
            );
        }
    }
}
