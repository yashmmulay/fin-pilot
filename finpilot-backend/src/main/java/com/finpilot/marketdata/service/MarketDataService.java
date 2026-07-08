package com.finpilot.marketdata.service;

import com.finpilot.common.enums.AssetType;
import com.finpilot.marketdata.dto.MarketQuote;

public interface MarketDataService {

    /**
     * Fetches the latest market price from the appropriate external provider.
     *
     * This service DOES NOT perform any caching.
     * Caching will be handled exclusively by MarketCacheService.
     */
    MarketQuote fetchLatestPrice(
            String symbol,
            String exchange,
            AssetType assetType
    );

}