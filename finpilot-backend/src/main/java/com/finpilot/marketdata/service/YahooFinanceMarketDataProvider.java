package com.finpilot.marketdata.service;

import com.finpilot.common.enums.AssetType;
import com.finpilot.marketdata.dto.MarketQuote;
import com.finpilot.marketdata.dto.yahoo.YahooQuoteResponse;
import com.finpilot.marketdata.dto.yahoo.YahooQuoteResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

//@Service
@Slf4j
@RequiredArgsConstructor
public class YahooFinanceMarketDataProvider {

    private final RestClient restClient;

    public MarketQuote getQuote(
            String assetIdentifier,
            AssetType assetType
    ) {

        String symbol = convertSymbol(assetIdentifier, assetType);

        log.info("Fetching Yahoo Finance quote for {}", symbol);

        YahooQuoteResponse response = restClient.get()
                .uri(
                        "https://query1.finance.yahoo.com/v7/finance/quote?symbols={symbol}",
                        symbol
                )
                .retrieve()
                .body(YahooQuoteResponse.class);

        if (response == null
                || response.getQuoteResponse() == null
                || response.getQuoteResponse().getResult() == null
                || response.getQuoteResponse().getResult().isEmpty()) {

            throw new RuntimeException(
                    "Unable to fetch live price for " + symbol
            );
        }

        YahooQuoteResult quote =
                response.getQuoteResponse().getResult().getFirst();

        return MarketQuote.builder()
                .symbol(quote.getSymbol())
                .exchange(quote.getFullExchangeName())
                .currentPrice(quote.getRegularMarketPrice())
                .currency(quote.getCurrency())
                .companyName(
                        quote.getLongName() != null
                                ? quote.getLongName()
                                : quote.getShortName()
                )
                .build();
    }

    private String convertSymbol(
            String symbol,
            AssetType assetType
    ) {

        if (symbol.contains(".")) {
            return symbol;
        }

        if (assetType == AssetType.STOCK) {
            return symbol + ".NS";
        }

        return symbol;
    }
}