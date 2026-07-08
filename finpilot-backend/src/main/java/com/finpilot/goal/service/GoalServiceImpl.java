package com.finpilot.goal.service;

import com.finpilot.common.enums.GoalStatus;
import com.finpilot.common.exception.ResourceNotFoundException;
import com.finpilot.goal.dto.CreateGoalRequest;
import com.finpilot.goal.dto.GoalResponse;
import com.finpilot.goal.entity.Goal;
import com.finpilot.goal.repository.GoalRepository;
import com.finpilot.portfolio.dto.PortfolioSummaryResponse;
import com.finpilot.portfolio.service.PortfolioAnalyticsService;
import com.finpilot.user.entity.User;
import com.finpilot.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final PortfolioAnalyticsService portfolioAnalyticsService;

    @Override
    public GoalResponse createGoal(Long userId, CreateGoalRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Goal goal = Goal.builder()
                .user(user)
                .goalName(request.getGoalName())
                .targetAmount(request.getTargetAmount())
                .targetDate(request.getTargetDate())
                .priority(request.getPriority())
                .build();

        Goal savedGoal = goalRepository.save(goal);

        PortfolioSummaryResponse portfolioSummary =
                portfolioAnalyticsService.getPortfolioSummary(user);

        return mapToResponse(savedGoal, portfolioSummary.getCurrentValue());
    }

    @Override
    public List<GoalResponse> getUserGoals(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        PortfolioSummaryResponse portfolioSummary =
                portfolioAnalyticsService.getPortfolioSummary(user);

        return goalRepository.findByUser(user)
                .stream()
                .map(goal -> mapToResponse(goal, portfolioSummary.getCurrentValue()))
                .toList();
    }

    @Override
    public GoalResponse getGoalById(Long userId, UUID goalId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Goal not found");
        }

        PortfolioSummaryResponse portfolioSummary =
                portfolioAnalyticsService.getPortfolioSummary(user);

        return mapToResponse(goal, portfolioSummary.getCurrentValue());
    }

    @Override
    public void deleteGoal(Long userId, UUID goalId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Goal not found");
        }

        goalRepository.delete(goal);
    }

    private GoalResponse mapToResponse(
            Goal goal,
            BigDecimal currentPortfolioValue) {

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

        // Cap progress at 100%
        if (progressPercentage.compareTo(BigDecimal.valueOf(100)) > 0) {
            progressPercentage = BigDecimal.valueOf(100);
        }

        // Automatically mark goal as completed
        if (currentPortfolioValue.compareTo(goal.getTargetAmount()) >= 0
                && goal.getStatus() != GoalStatus.COMPLETED) {

            goal.setStatus(GoalStatus.COMPLETED);
            goalRepository.save(goal);
        }

        return GoalResponse.builder()
                .id(goal.getId())
                .goalName(goal.getGoalName())
                .targetAmount(goal.getTargetAmount())
                .targetDate(goal.getTargetDate())
                .priority(goal.getPriority())
                .status(goal.getStatus())
                .currentPortfolioValue(currentPortfolioValue)
                .remainingAmount(remainingAmount)
                .progressPercentage(progressPercentage)
                .build();
    }
}