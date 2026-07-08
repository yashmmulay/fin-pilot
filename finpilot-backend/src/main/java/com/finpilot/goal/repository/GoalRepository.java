package com.finpilot.goal.repository;

import com.finpilot.common.enums.GoalPriority;
import com.finpilot.common.enums.GoalStatus;
import com.finpilot.goal.entity.Goal;
import com.finpilot.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GoalRepository extends JpaRepository<Goal, UUID> {

    List<Goal> findByUser(User user);

    long countByUser(User user);

    long countByUserAndStatus(User user, GoalStatus status);

    Optional<Goal> findFirstByUserAndPriorityOrderByCreatedAtAsc(
            User user,
            GoalPriority priority
    );

}