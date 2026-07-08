package com.finpilot.portfolio.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
public class PortfolioSummaryResponse {
    private BigDecimal totalInvestment;

    private BigDecimal currentValue;

    private BigDecimal totalProfitLoss;

    private BigDecimal returnPercentage;

    private Integer assetCount;
}
