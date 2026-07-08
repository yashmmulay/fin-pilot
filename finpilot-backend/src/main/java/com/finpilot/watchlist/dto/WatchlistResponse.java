package com.finpilot.watchlist.dto;

import com.finpilot.common.enums.AssetType;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WatchlistResponse {

    private UUID id;

    private String assetSymbol;

    private String assetName;

    private AssetType assetType;

    private BigDecimal currentPrice;

    private String currency;

    private String exchange;

    private LocalDateTime createdAt;
}