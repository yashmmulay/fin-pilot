package com.finpilot.portfolio.service;

import com.finpilot.portfolio.dto.PortfolioAllocationResponse;
import com.finpilot.portfolio.dto.PortfolioSummaryResponse;
import com.finpilot.user.entity.User;

import java.util.List;

public interface PortfolioAnalyticsService {

    PortfolioSummaryResponse getPortfolioSummary(User user);

    List<PortfolioAllocationResponse> getPortfolioAllocation(User user);
}
