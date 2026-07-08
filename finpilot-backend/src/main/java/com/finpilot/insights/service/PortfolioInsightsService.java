package com.finpilot.insights.service;

import com.finpilot.insights.dto.PortfolioInsights;

public interface PortfolioInsightsService {

    PortfolioInsights generateInsights(Long userId);

}