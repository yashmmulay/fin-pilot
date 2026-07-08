package com.finpilot.portfolio.controller;

import com.finpilot.auth.service.CustomUserDetails;
import com.finpilot.portfolio.dto.PortfolioAllocationResponse;
import com.finpilot.portfolio.dto.PortfolioRequest;
import com.finpilot.portfolio.dto.PortfolioResponse;
import com.finpilot.portfolio.service.PortfolioAnalyticsService;
import com.finpilot.portfolio.service.PortfolioService;
import com.finpilot.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final PortfolioAnalyticsService portfolioAnalyticsService;

    @PostMapping
    public ResponseEntity<PortfolioResponse> addAsset(@AuthenticationPrincipal CustomUserDetails userDetails, @Valid @RequestBody PortfolioRequest request) {
        PortfolioResponse response = portfolioService.addAsset(userDetails.getUser(), request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<PortfolioResponse>> getPortfolio(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(portfolioService.getPortfolio(userDetails.getUser()));
    }

    @PutMapping("/{portfolioId}")
    public ResponseEntity<PortfolioResponse> updateAsset(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                         @PathVariable UUID portfolioId,
                                                         @RequestBody PortfolioRequest request) {
        return ResponseEntity.ok(portfolioService.updateAsset(userDetails.getUser(), portfolioId, request));
    }

    @DeleteMapping("/{portfolioId}")
    public ResponseEntity<Void> deleteAsset(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable UUID portfolioId) {
        portfolioService.deleteAsset(userDetails.getUser(), portfolioId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/allocation")
    public ResponseEntity<List<PortfolioAllocationResponse>> getPortfolioAllocation(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {

        return ResponseEntity.ok(
                portfolioAnalyticsService.getPortfolioAllocation(
                        userDetails.getUser()
                )
        );
    }

}
