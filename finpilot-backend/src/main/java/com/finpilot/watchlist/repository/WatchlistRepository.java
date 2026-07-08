package com.finpilot.watchlist.repository;

import com.finpilot.common.enums.AssetType;
import com.finpilot.user.entity.User;
import com.finpilot.watchlist.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WatchlistRepository extends JpaRepository<Watchlist, UUID> {

    List<Watchlist> findByUser(User user);

    Optional<Watchlist> findByIdAndUser(
            UUID id,
            User user
    );

    Optional<Watchlist> findByUserAndAssetSymbolAndExchangeAndAssetType(
            User user,
            String assetSymbol,
            String exchange,
            AssetType assetType
    );

    boolean existsByUserAndAssetSymbolAndExchangeAndAssetType(
            User user,
            String assetSymbol,
            String exchange,
            AssetType assetType
    );

    long countByUser(User user);
}