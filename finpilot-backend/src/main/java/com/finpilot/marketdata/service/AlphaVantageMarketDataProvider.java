package com.finpilot.marketdata.service;

import com.finpilot.common.enums.AssetType;
import com.finpilot.common.exception.ResourceNotFoundException;
import com.finpilot.marketdata.dto.GlobalQuote;
import com.finpilot.marketdata.dto.MarketQuote;
import com.finpilot.marketdata.dto.PriceResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlphaVantageMarketDataProvider {

    private final RestClient restClient;

    @Value("${marketdata.base.url}")
    private String baseUrl;

    @Value("${marketdata.api.key}")
    private String apiKey;

    /**
     * Fetches the latest market price from Alpha Vantage.
     *
     * This class ONLY communicates with the external API.
     * It does not perform caching.
     */
    public MarketQuote fetchLatestPrice(
            String symbol,
            String exchange,
            AssetType assetType
    ) {

        if (assetType == AssetType.MUTUAL_FUND) {
            throw new UnsupportedOperationException(
                    "Mutual Funds are not supported by Alpha Vantage."
            );
        }

        String apiSymbol = buildApiSymbol(symbol, exchange);

        log.info("Fetching market data for {}", apiSymbol);

        PriceResponse response = restClient.get()
                .uri(
                        baseUrl +
                                "/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={apiKey}",
                        apiSymbol,
                        apiKey
                )
                .retrieve()
                .body(PriceResponse.class);

        if (response == null
                || response.getGlobalQuote() == null
                || response.getGlobalQuote().getPrice() == null) {

            throw new ResourceNotFoundException(
                    "Unable to fetch live market price for " + apiSymbol
            );
        }

        GlobalQuote quote = response.getGlobalQuote();

        return MarketQuote.builder()
                .symbol(symbol.toUpperCase())
                .exchange(exchange)
                .assetType(assetType)
                .companyName(symbol.toUpperCase())
                .currency(getCurrency(exchange))
                .currentPrice(new BigDecimal(quote.getPrice()))
                .lastUpdated(LocalDateTime.now())
                .source("ALPHA_VANTAGE")
                .build();
    }

    /**
     * Converts user symbol + exchange into Alpha Vantage format.
     */
    private String buildApiSymbol(
            String symbol,
            String exchange
    ) {

        symbol = symbol.toUpperCase();

        if (exchange == null) {
            return symbol;
        }

        return switch (exchange.toUpperCase()) {

            case "NSE" -> symbol + ".NSE";

            case "BSE" -> symbol + ".BSE";

            default -> symbol;
        };
    }

    /**
     * Determines trading currency based on exchange.
     */
    private String getCurrency(String exchange) {

        if (exchange == null) {
            return "USD";
        }

        return switch (exchange.toUpperCase()) {

            case "NSE", "BSE" -> "INR";

            default -> "USD";
        };
    }

}
