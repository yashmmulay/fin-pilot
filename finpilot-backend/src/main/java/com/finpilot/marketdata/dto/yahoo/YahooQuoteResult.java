package com.finpilot.marketdata.dto.yahoo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.math.BigDecimal;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class YahooQuoteResult {

    private String symbol;

    private String shortName;

    private String longName;

    private BigDecimal regularMarketPrice;

    private BigDecimal regularMarketChange;

    private BigDecimal regularMarketChangePercent;

    private String currency;

    private String fullExchangeName;
}