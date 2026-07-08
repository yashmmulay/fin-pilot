package com.finpilot.marketdata.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class PriceResponse {

    @JsonProperty("Global Quote")
    private GlobalQuote globalQuote;
}