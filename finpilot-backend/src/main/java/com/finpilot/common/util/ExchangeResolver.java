package com.finpilot.common.util;

import com.finpilot.common.enums.AssetType;
import com.finpilot.portfolio.exception.InvalidExchangeException;
import org.springframework.stereotype.Component;

@Component
public class ExchangeResolver {

    private static final String MUTUAL_FUND_EXCHANGE = "MF";

    public String resolve(
            String exchange,
            AssetType assetType
    ) {

        if (assetType == AssetType.MUTUAL_FUND) {
            return MUTUAL_FUND_EXCHANGE;
        }

        if (exchange == null || exchange.isBlank()) {
            throw new InvalidExchangeException(
                    "Exchange is required for STOCK and ETF."
            );
        }

        return exchange.trim().toUpperCase();
    }
}
