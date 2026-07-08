package com.finpilot.marketdata.service;

import com.finpilot.common.enums.AssetType;
import com.finpilot.common.exception.ResourceNotFoundException;
import com.finpilot.marketdata.data.DevelopmentMarketDatabase;
import com.finpilot.marketdata.dto.MarketQuote;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class DevelopmentMarketDataProvider {

    private static final double MAX_PRICE_FLUCTUATION_PERCENT = 0.3;

    private final DevelopmentMarketDatabase marketDatabase;

    private final Random random = new Random();

    /**
     * Returns a simulated live market quote.
     *
     * NOTE:
     * This provider is temporary and exists only for local development.
     * It will be removed after the Market Cache module is fully integrated
     * with Alpha Vantage.
     */
    public MarketQuote fetchLatestPrice(
            String symbol,
            String exchange,
            AssetType assetType
    ) {

        String normalizedSymbol = symbol.toUpperCase();

        if (normalizedSymbol.contains(".")) {
            normalizedSymbol = normalizedSymbol.substring(
                    0,
                    normalizedSymbol.indexOf('.')
            );
        }

        MarketQuote storedQuote = marketDatabase.getQuote(normalizedSymbol);

        if (storedQuote == null) {
            throw new ResourceNotFoundException(
                    "Asset not found: " + symbol
            );
        }

        BigDecimal simulatedPrice = simulatePrice(
                storedQuote.getCurrentPrice()
        );

        return MarketQuote.builder()
                .symbol(storedQuote.getSymbol())
                .exchange(storedQuote.getExchange())
                .assetType(assetType)
                .companyName(storedQuote.getCompanyName())
                .currency(storedQuote.getCurrency())
                .currentPrice(simulatedPrice)
                .lastUpdated(LocalDateTime.now())
                .source("DEVELOPMENT")
                .build();
    }

    private BigDecimal simulatePrice(BigDecimal basePrice) {

        double randomPercentage =
                (random.nextDouble() * (2 * MAX_PRICE_FLUCTUATION_PERCENT))
                        - MAX_PRICE_FLUCTUATION_PERCENT;

        BigDecimal multiplier = BigDecimal.valueOf(
                1 + (randomPercentage / 100.0)
        );

        return basePrice
                .multiply(multiplier)
                .setScale(2, RoundingMode.HALF_UP);
    }
}