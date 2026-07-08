package com.finpilot.goal.service;

import com.finpilot.goal.dto.CreateGoalRequest;
import com.finpilot.goal.dto.GoalResponse;

import java.util.List;
import java.util.UUID;

public interface GoalService {

    GoalResponse createGoal(Long userId, CreateGoalRequest request);

    List<GoalResponse> getUserGoals(Long userId);

    void deleteGoal(Long userId, UUID goalId);

    GoalResponse getGoalById(Long userId, UUID goalId);

}