package com.finpilot.marketdata.service;

import com.finpilot.common.enums.AssetType;
import com.finpilot.marketdata.entity.MarketPriceCache;

/**
 * Handles all market price caching.
 *
 * Flow:
 *
 * Portfolio / Watchlist / Dashboard / Insights
 *          ↓
 *   MarketCacheService
 *          ↓
 * MarketPriceCacheRepository
 *          ↓
 * MarketDataService
 *          ↓
 * External Provider
 *
 * No module should directly invoke MarketDataService.
 */
public interface MarketCacheService {

    /**
     * Returns the latest market price.
     *
     * Used while creating Portfolio and Watchlist entries.
     *
     * If a cache entry is created for the first time,
     * companyName will be stored permanently.
     *
     * Existing company names are never overwritten.
     *
     * @param symbol trading symbol
     * @param companyName company/fund name from request
     * @param exchange exchange
     * @param assetType asset type
     * @return latest market cache
     */
    MarketPriceCache getLatestMarketPrice(
            String symbol,
            String companyName,
            String exchange,
            AssetType assetType
    );

    /**
     * Returns latest market price.
     *
     * Used by:
     * - Dashboard
     * - Portfolio Analytics
     * - Portfolio Insights
     *
     * This method NEVER modifies companyName.
     *
     * @param symbol trading symbol
     * @param exchange exchange
     * @param assetType asset type
     * @return latest market cache
     */
    MarketPriceCache getLatestMarketPrice(
            String symbol,
            String exchange,
            AssetType assetType
    );
}