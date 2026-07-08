package com.finpilot.portfolio.repository;

import com.finpilot.common.enums.AssetType;
import com.finpilot.portfolio.entity.Portfolio;
import com.finpilot.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PortfolioRepository extends JpaRepository<Portfolio, UUID> {

    List<Portfolio> findByUserOrderByUpdatedAtDesc(User user);

    Optional<Portfolio> findByIdAndUser(UUID id, User user);

    long countByUser(User user);

    Optional<Portfolio> findByUserAndAssetSymbolAndExchangeAndAssetType(
            User user,
            String assetSymbol,
            String exchange,
            AssetType assetType
    );
}