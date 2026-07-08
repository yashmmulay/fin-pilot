package com.finpilot.goal.dto;

import com.finpilot.common.enums.GoalPriority;
import com.finpilot.common.enums.GoalStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalResponse {

    private UUID id;

    private String goalName;

    private BigDecimal targetAmount;

    private LocalDate targetDate;

    private GoalPriority priority;

    private GoalStatus status;

    // Calculated values
    private BigDecimal currentPortfolioValue;

    private BigDecimal remainingAmount;

    private BigDecimal progressPercentage;
}