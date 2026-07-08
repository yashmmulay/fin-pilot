package com.finpilot.marketdata.service;

import com.finpilot.common.enums.AssetType;
import com.finpilot.marketdata.dto.MarketQuote;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MarketDataServiceImpl implements MarketDataService {

    private final AlphaVantageMarketDataProvider alphaVantageMarketDataProvider;

    private final MfApiMarketDataProvider mfApiMarketDataProvider;

    @Override
    public MarketQuote fetchLatestPrice(
            String symbol,
            String exchange,
            AssetType assetType
    ) {

        return switch (assetType) {

            case STOCK, ETF ->
                    alphaVantageMarketDataProvider.fetchLatestPrice(
                            symbol,
                            exchange,
                            assetType
                    );

            case MUTUAL_FUND ->
                    mfApiMarketDataProvider.fetchLatestPrice(
                            symbol,
                            exchange,
                            assetType
                    );
        };
    }
}