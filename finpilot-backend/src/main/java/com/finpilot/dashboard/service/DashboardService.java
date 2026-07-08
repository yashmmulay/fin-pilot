package com.finpilot.dashboard.service;

import com.finpilot.dashboard.dto.DashboardResponse;

public interface DashboardService {

    DashboardResponse getDashboard(Long userId);

}