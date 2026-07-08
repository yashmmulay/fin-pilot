package com.finpilot.marketdata.repository;

import com.finpilot.marketdata.entity.MarketPriceCache;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MarketPriceCacheRepository
        extends JpaRepository<MarketPriceCache, UUID> {

    Optional<MarketPriceCache> findBySymbolAndExchange(
            String symbol,
            String exchange
    );

}