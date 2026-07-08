package com.finpilot.portfolio.service;

import com.finpilot.portfolio.dto.PortfolioRequest;
import com.finpilot.portfolio.dto.PortfolioResponse;
import com.finpilot.user.entity.User;

import java.util.List;
import java.util.UUID;

public interface PortfolioService {

    PortfolioResponse addAsset(User user, PortfolioRequest request);

    List<PortfolioResponse> getPortfolio(User user);

    PortfolioResponse updateAsset(User user, UUID portfolioId, PortfolioRequest request);

    void deleteAsset(User user, UUID portfolioId);
}
