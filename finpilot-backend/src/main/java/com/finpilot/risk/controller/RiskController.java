package com.finpilot.risk.controller;

import com.finpilot.auth.service.CustomUserDetails;
import com.finpilot.risk.dto.RiskAlertResponse;
import com.finpilot.risk.service.RiskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/risk")
@RequiredArgsConstructor
public class RiskController {

    private final RiskService riskService;

    @GetMapping
    public ResponseEntity<List<RiskAlertResponse>> getRiskAlerts(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return ResponseEntity.ok(
                riskService.getRiskAlerts(
                        userDetails.getUser().getId()
                )
        );
    }
}