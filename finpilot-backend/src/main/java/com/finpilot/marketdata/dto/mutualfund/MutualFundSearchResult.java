package com.finpilot.marketdata.dto.mutualfund;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MutualFundSearchResult {

    @JsonProperty("schemeCode")
    private Long schemeCode;

    @JsonProperty("schemeName")
    private String schemeName;

}