package com.finpilot.marketdata.dto.mutualfund;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MutualFundLatestResponse {

    private MutualFundMeta meta;

    private List<MutualFundNavData> data;

    private String status;

}