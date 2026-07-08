package com.finpilot.marketdata.dto.mutualfund;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MutualFundMeta {

    @JsonProperty("scheme_code")
    private String schemeCode;

    @JsonProperty("scheme_name")
    private String schemeName;

    @JsonProperty("nav")
    private String nav;

    @JsonProperty("date")
    private String date;
}