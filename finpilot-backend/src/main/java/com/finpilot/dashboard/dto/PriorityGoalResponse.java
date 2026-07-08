package com.finpilot.dashboard.dto;

import com.finpilot.common.enums.GoalPriority;
import com.finpilot.common.enums.GoalStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriorityGoalResponse {

    private String goalName;

    private GoalPriority priority;

    private GoalStatus status;

    private BigDecimal targetAmount;

    private LocalDate targetDate;

    private BigDecimal currentPortfolioValue;

    private BigDecimal remainingAmount;

    private BigDecimal progressPercentage;

}