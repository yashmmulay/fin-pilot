package com.finpilot.risk.service;

import com.finpilot.common.enums.AlertSeverity;
import com.finpilot.dashboard.dto.DashboardResponse;
import com.finpilot.dashboard.service.DashboardService;
import com.finpilot.risk.dto.RiskAlertResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RiskServiceImpl implements RiskService {

    private final DashboardService dashboardService;

    @Override
    public List<RiskAlertResponse> getRiskAlerts(Long userId) {

        DashboardResponse dashboard =
                dashboardService.getDashboard(userId);

        List<RiskAlertResponse> alerts = new ArrayList<>();

        // Rule 1 - Empty Portfolio
        if (dashboard.getTotalAssets() == 0) {

            alerts.add(
                    RiskAlertResponse.builder()
                            .title("Empty Portfolio")
                            .message("Your portfolio is empty. Add your investments to start tracking your wealth.")
                            .severity(AlertSeverity.HIGH)
                            .build()
            );
        }

        // Rule 2 - Portfolio Loss
        if (dashboard.getTotalProfitLoss()
                .compareTo(BigDecimal.ZERO) < 0) {

            alerts.add(
                    RiskAlertResponse.builder()
                            .title("Portfolio Loss")
                            .message("Your portfolio is currently running at a loss.")
                            .severity(AlertSeverity.HIGH)
                            .build()
            );
        }

        // Rule 3 - No Active Goals
        if (dashboard.getActiveGoals() == 0) {

            alerts.add(
                    RiskAlertResponse.builder()
                            .title("No Active Goals")
                            .message("You currently have no active financial goals.")
                            .severity(AlertSeverity.MEDIUM)
                            .build()
            );
        }

        // Rule 4 - Empty Watchlist
        if (dashboard.getWatchlistCount() == 0) {

            alerts.add(
                    RiskAlertResponse.builder()
                            .title("Watchlist Empty")
                            .message("You are not tracking any assets. Add stocks to your watchlist to monitor market opportunities.")
                            .severity(AlertSeverity.LOW)
                            .build()
            );
        }

        // Rule 5 - Goal Completed
        if (dashboard.getCompletedGoals() > 0) {

            alerts.add(
                    RiskAlertResponse.builder()
                            .title("Goal Achieved")
                            .message("Congratulations! You have successfully completed one of your financial goals.")
                            .severity(AlertSeverity.LOW)
                            .build()
            );
        }

        // No risks detected
        if (alerts.isEmpty()) {

            alerts.add(
                    RiskAlertResponse.builder()
                            .title("Portfolio Looks Healthy")
                            .message("Great job! No major risks were detected in your portfolio. Your investments, goals, and watchlist are all in good shape.")
                            .severity(AlertSeverity.SUCCESS)
                            .build()
            );

        }

        // Sort alerts by severity
        alerts.sort(Comparator.comparing(RiskAlertResponse::getSeverity));

        return alerts;
    }
}