package com.finpilot.marketdata.entity;

import com.finpilot.common.enums.AssetType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "market_price_cache",
        indexes = {
                @Index(name = "idx_market_symbol_exchange", columnList = "symbol,exchange"),
                @Index(name = "idx_market_last_updated", columnList = "last_updated")
        },
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"symbol", "exchange"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarketPriceCache {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String symbol;

    @Column(nullable = false)
    private String exchange;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetType assetType;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false, precision = 19, scale = 4)
    private BigDecimal currentPrice;

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated;

    @Column(nullable = false)
    private String source;
}