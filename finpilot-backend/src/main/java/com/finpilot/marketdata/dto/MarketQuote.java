package com.finpilot.marketdata.dto;

import com.finpilot.common.enums.AssetType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MarketQuote {

    /**
     * Trading symbol.
     * Examples:
     * TCS
     * INFY
     * AAPL
     * SPY
     * 120503 (Mutual Fund Scheme Code)
     */
    private String symbol;

    /**
     * Exchange / Market
     * Examples:
     * NSE
     * BSE
     * NASDAQ
     * NYSE
     * MF
     */
    private String exchange;

    /**
     * Asset category.
     */
    private AssetType assetType;

    /**
     * Company / Fund name.
     */
    private String companyName;

    /**
     * Trading currency.
     */
    private String currency;

    /**
     * Latest market price / NAV.
     */
    private BigDecimal currentPrice;

    /**
     * Time at which this quote was fetched.
     */
    private LocalDateTime lastUpdated;

    /**
     * Source of market data.
     * Examples:
     * ALPHA_VANTAGE
     * MF_API
     */
    private String source;
}