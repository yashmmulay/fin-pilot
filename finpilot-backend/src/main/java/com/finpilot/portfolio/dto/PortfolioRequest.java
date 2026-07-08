package com.finpilot.portfolio.dto;

import com.finpilot.common.enums.AssetType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioRequest {

    @NotBlank(message = "Asset symbol is required")
    private String assetSymbol;

    @NotBlank(message = "Asset name is required")
    private String assetName;

    @NotNull(message = "Asset type is required")
    private AssetType assetType;

    /**
     * Required only for STOCK and ETF.
     * Mutual Funds will use "MF" internally.
     *
     * Allowed values:
     * NSE
     * BSE
     * NASDAQ
     * NYSE
     */
    private String exchange;

    @NotNull(message = "Quantity is required")
    @DecimalMin(
            value = "0.0001",
            message = "Quantity must be greater than 0"
    )
    private BigDecimal quantity;

    @NotNull(message = "Purchase price is required")
    @DecimalMin(
            value = "0.00",
            inclusive = false,
            message = "Purchase price must be greater than 0"
    )
    private BigDecimal purchasePrice;

    @NotNull(message = "Purchase date is required")
    @PastOrPresent(
            message = "Purchase date cannot be in the future"
    )
    private LocalDate purchaseDate;
}