package com.finpilot.dashboard.service;

import com.finpilot.common.enums.GoalPriority;
import com.finpilot.common.enums.GoalStatus;
import com.finpilot.common.exception.ResourceNotFoundException;
import com.finpilot.dashboard.dto.DashboardResponse;
import com.finpilot.dashboard.dto.PriorityGoalResponse;
import com.finpilot.goal.entity.Goal;
import com.finpilot.goal.repository.GoalRepository;
import com.finpilot.portfolio.dto.PortfolioSummaryResponse;
import com.finpilot.portfolio.repository.PortfolioRepository;
import com.finpilot.portfolio.service.PortfolioAnalyticsService;
import com.finpilot.user.entity.User;
import com.finpilot.user.repository.UserRepository;
import com.finpilot.watchlist.repository.WatchlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;
    private final PortfolioAnalyticsService portfolioAnalyticsService;
    private final WatchlistRepository watchlistRepository;
    private final GoalRepository goalRepository;

    @Override
    public DashboardResponse getDashboard(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        PortfolioSummaryResponse portfolioSummary =
                portfolioAnalyticsService.getPortfolioSummary(user);

        long totalAssets = portfolioRepository.countByUser(user);

        long watchlistCount = watchlistRepository.countByUser(user);

        long totalGoals = goalRepository.countByUser(user);

        long activeGoals =
                goalRepository.countByUserAndStatus(user, GoalStatus.ACTIVE);

        long completedGoals =
                goalRepository.countByUserAndStatus(user, GoalStatus.COMPLETED);

        PriorityGoalResponse highestPriorityGoal =
                getHighestPriorityGoal(user);

        return DashboardResponse.builder()
                .totalInvestment(portfolioSummary.getTotalInvestment())
                .currentValue(portfolioSummary.getCurrentValue())
                .totalProfitLoss(portfolioSummary.getTotalProfitLoss())
                .returnPercentage(portfolioSummary.getReturnPercentage())
                .totalAssets(totalAssets)
                .watchlistCount(watchlistCount)
                .totalGoals(totalGoals)
                .activeGoals(activeGoals)
                .completedGoals(completedGoals)
                .highestPriorityGoal(highestPriorityGoal)
                .build();
    }

    private PriorityGoalResponse getHighestPriorityGoal(User user) {

        Goal goal = goalRepository
                .findFirstByUserAndPriorityOrderByCreatedAtAsc(
                        user,
                        GoalPriority.HIGH)
                .orElse(null);

        if (goal == null) {
            goal = goalRepository
                    .findFirstByUserAndPriorityOrderByCreatedAtAsc(
                            user,
                            GoalPriority.MEDIUM)
                    .orElse(null);
        }

        if (goal == null) {
            goal = goalRepository
                    .findFirstByUserAndPriorityOrderByCreatedAtAsc(
                            user,
                            GoalPriority.LOW)
                    .orElse(null);
        }

        if (goal == null) {
            return null;
        }

        PortfolioSummaryResponse portfolioSummary =
                portfolioAnalyticsService.getPortfolioSummary(user);

        BigDecimal currentPortfolioValue =
                portfolioSummary.getCurrentValue();

        BigDecimal remainingAmount =
                goal.getTargetAmount().subtract(currentPortfolioValue);

        if (remainingAmount.compareTo(BigDecimal.ZERO) < 0) {
            remainingAmount = BigDecimal.ZERO;
        }

        BigDecimal progressPercentage = BigDecimal.ZERO;

        if (goal.getTargetAmount().compareTo(BigDecimal.ZERO) > 0) {

            progressPercentage = currentPortfolioValue
                    .multiply(BigDecimal.valueOf(100))
                    .divide(
                            goal.getTargetAmount(),
                            2,
                            RoundingMode.HALF_UP
                    );
        }

        if (progressPercentage.compareTo(BigDecimal.valueOf(100)) > 0) {
            progressPercentage = BigDecimal.valueOf(100);
        }

        if (currentPortfolioValue.compareTo(goal.getTargetAmount()) >= 0
                && goal.getStatus() != GoalStatus.COMPLETED) {

            goal.setStatus(GoalStatus.COMPLETED);
            goalRepository.save(goal);
        }

        return PriorityGoalResponse.builder()
                .goalName(goal.getGoalName())
                .priority(goal.getPriority())
                .status(goal.getStatus())
                .targetAmount(goal.getTargetAmount())
                .targetDate(goal.getTargetDate())
                .currentPortfolioValue(currentPortfolioValue)
                .remainingAmount(remainingAmount)
                .progressPercentage(progressPercentage)
                .build();
    }
}