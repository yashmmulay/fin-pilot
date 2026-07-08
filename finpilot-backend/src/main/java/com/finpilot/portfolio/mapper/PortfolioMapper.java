package com.finpilot.portfolio.mapper;

import com.finpilot.portfolio.dto.PortfolioRequest;
import com.finpilot.portfolio.dto.PortfolioResponse;
import com.finpilot.portfolio.entity.Portfolio;
import com.finpilot.user.entity.User;

public final class PortfolioMapper {

    private PortfolioMapper() {
    }

    public static Portfolio toEntity(PortfolioRequest request, User user) {

        return Portfolio.builder()
                .user(user)
                .assetSymbol(request.getAssetSymbol())
                .assetName(request.getAssetName())
                .exchange(request.getExchange())
                .assetType(request.getAssetType())
                .quantity(request.getQuantity())
                .purchasePrice(request.getPurchasePrice())
                .purchaseDate(request.getPurchaseDate())
                .build();
    }

    public static PortfolioResponse toResponse(Portfolio portfolio) {

        return PortfolioResponse.builder()
                .id(portfolio.getId())
                .assetSymbol(portfolio.getAssetSymbol())
                .assetName(portfolio.getAssetName())
                .exchange(portfolio.getExchange())
                .assetType(portfolio.getAssetType())
                .quantity(portfolio.getQuantity())
                .purchasePrice(portfolio.getPurchasePrice())
                .currentPrice(portfolio.getCurrentPrice())
                .purchaseDate(portfolio.getPurchaseDate())
                .build();
    }
}