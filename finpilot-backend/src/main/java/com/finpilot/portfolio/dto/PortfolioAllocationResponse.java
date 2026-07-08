package com.finpilot.portfolio.dto;

import com.finpilot.common.enums.AssetType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioAllocationResponse {

    private AssetType assetType;

    private BigDecimal currentValue;

    private double percentage;
}