package com.finpilot.marketdata.dto.yahoo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class YahooQuoteResponse {

    private QuoteResponse quoteResponse;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class QuoteResponse {

        private List<YahooQuoteResult> result;

    }

}