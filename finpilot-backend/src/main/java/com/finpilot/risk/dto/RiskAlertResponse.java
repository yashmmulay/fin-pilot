package com.finpilot.risk.dto;

import com.finpilot.common.enums.AlertSeverity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RiskAlertResponse {

    private String title;

    private String message;

    private AlertSeverity severity;
}