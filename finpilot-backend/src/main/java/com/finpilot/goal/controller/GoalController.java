package com.finpilot.goal.controller;

import com.finpilot.auth.service.CustomUserDetails;
import com.finpilot.goal.dto.CreateGoalRequest;
import com.finpilot.goal.dto.GoalResponse;
import com.finpilot.goal.service.GoalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @PostMapping
    public ResponseEntity<GoalResponse> createGoal(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody CreateGoalRequest request) {

        GoalResponse response = goalService.createGoal(
                userDetails.getUser().getId(),
                request
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<GoalResponse>> getUserGoals(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return ResponseEntity.ok(
                goalService.getUserGoals(userDetails.getUser().getId())
        );
    }

    @GetMapping("/{goalId}")
    public ResponseEntity<GoalResponse> getGoalById(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID goalId) {

        return ResponseEntity.ok(
                goalService.getGoalById(
                        userDetails.getUser().getId(),
                        goalId
                )
        );
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<Void> deleteGoal(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID goalId) {

        goalService.deleteGoal(
                userDetails.getUser().getId(),
                goalId
        );

        return ResponseEntity.noContent().build();
    }
}