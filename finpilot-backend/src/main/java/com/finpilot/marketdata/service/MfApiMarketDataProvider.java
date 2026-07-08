package com.finpilot.marketdata.service;

import com.finpilot.common.enums.AssetType;
import com.finpilot.common.exception.ResourceNotFoundException;
import com.finpilot.marketdata.dto.MarketQuote;
import com.finpilot.marketdata.dto.mutualfund.MutualFundLatestResponse;
import com.finpilot.marketdata.dto.mutualfund.MutualFundNavData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class MfApiMarketDataProvider {

    private static final String BASE_URL = "https://api.mfapi.in";

    private final RestClient restClient;

    /**
     * Fetches the latest NAV from MF API.
     *
     * This provider ONLY communicates with the external API.
     * It does not perform caching.
     */
    public MarketQuote fetchLatestPrice(
            String schemeCode,
            String exchange,
            AssetType assetType
    ) {

        if (assetType != AssetType.MUTUAL_FUND) {
            throw new UnsupportedOperationException(
                    "MF API supports only Mutual Funds."
            );
        }

        log.info("Fetching latest NAV for Mutual Fund {}", schemeCode);

        MutualFundLatestResponse response = restClient.get()
                .uri(BASE_URL + "/mf/{schemeCode}/latest", schemeCode)
                .retrieve()
                .body(MutualFundLatestResponse.class);

        if (response == null
                || response.getMeta() == null
                || response.getData() == null
                || response.getData().isEmpty()) {

            throw new ResourceNotFoundException(
                    "Unable to fetch NAV for Mutual Fund: " + schemeCode
            );
        }

        MutualFundNavData latestNav = response.getData().get(0);

        return MarketQuote.builder()
                .symbol(String.valueOf(response.getMeta().getSchemeCode()))
                .exchange("MF")
                .assetType(AssetType.MUTUAL_FUND)
                .companyName(null)
                .currency("INR")
                .currentPrice(new BigDecimal(latestNav.getNav()))
                .lastUpdated(LocalDateTime.now())
                .source("MF_API")
                .build();
    }

}