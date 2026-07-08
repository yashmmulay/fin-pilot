package com.finpilot.portfolio.dto;

import com.finpilot.common.enums.AssetType;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioResponse {

    private UUID id;

    private String assetSymbol;

    private String assetName;

    /**
     * Exchange where the asset is traded.
     *
     * Examples:
     * NSE
     * BSE
     * NASDAQ
     * NYSE
     * MF
     */
    private String exchange;

    private AssetType assetType;

    private BigDecimal quantity;

    private BigDecimal purchasePrice;

    private BigDecimal currentPrice;

    private LocalDate purchaseDate;
}