package com.finpilot.watchlist.dto;

import com.finpilot.common.enums.AssetType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddWatchlistRequest {

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
     * Examples:
     * NSE
     * BSE
     * NASDAQ
     * NYSE
     */
    private String exchange;
}