package com.finpilot.risk.service;

import com.finpilot.risk.dto.RiskAlertResponse;

import java.util.List;

public interface RiskService {

    List<RiskAlertResponse> getRiskAlerts(Long userId);

}