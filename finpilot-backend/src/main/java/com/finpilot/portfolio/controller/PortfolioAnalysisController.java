package com.finpilot.portfolio.controller;

import com.finpilot.auth.service.CustomUserDetails;
import com.finpilot.marketdata.dto.MarketQuote;
import com.finpilot.portfolio.dto.PortfolioSummaryResponse;
import com.finpilot.portfolio.service.PortfolioAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
public class PortfolioAnalysisController {

    private final PortfolioAnalyticsService portfolioAnalyticsService;

    @GetMapping("/summary")
    public ResponseEntity<PortfolioSummaryResponse> getPortfolioSummary(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(portfolioAnalyticsService.getPortfolioSummary(userDetails.getUser()));
    }

}
