package com.finpilot.insights.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioInsights {

    /* ===============================
            Portfolio Overview
       =============================== */

    private BigDecimal totalInvestment;

    private BigDecimal currentValue;

    private BigDecimal totalProfitLoss;

    private BigDecimal returnPercentage;

    private Integer totalHoldings;

    /* ===============================
            Largest Holding
       =============================== */

    private String largestHoldingSymbol;

    private String largestHoldingName;

    private BigDecimal largestHoldingValue;

    private BigDecimal largestHoldingPercentage;

    /* ===============================
            Performance
       =============================== */

    private String bestPerformerSymbol;

    private BigDecimal bestPerformerReturn;

    private String worstPerformerSymbol;

    private BigDecimal worstPerformerReturn;

    /* ===============================
            Diversification
       =============================== */

    private Integer diversificationScore;

    /* ===============================
            Asset Allocation
       =============================== */

    private BigDecimal stockAllocationPercentage;

    private BigDecimal mutualFundAllocationPercentage;

    private BigDecimal etfAllocationPercentage;

}