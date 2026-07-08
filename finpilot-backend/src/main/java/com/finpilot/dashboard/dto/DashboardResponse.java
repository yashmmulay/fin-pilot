package com.finpilot.dashboard.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private BigDecimal totalInvestment;

    private BigDecimal currentValue;

    private BigDecimal totalProfitLoss;

    private BigDecimal returnPercentage;

    private Long totalAssets;

    private Long watchlistCount;

    private Long totalGoals;

    private Long activeGoals;

    private Long completedGoals;

    private PriorityGoalResponse highestPriorityGoal;
}