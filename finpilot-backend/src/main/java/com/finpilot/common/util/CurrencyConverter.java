package com.finpilot.common.util;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class CurrencyConverter {

    private static final BigDecimal USD_TO_INR = BigDecimal.valueOf(86.00);
    private static final BigDecimal EUR_TO_INR = BigDecimal.valueOf(99.00);
    private static final BigDecimal GBP_TO_INR = BigDecimal.valueOf(116.00);
    private static final BigDecimal JPY_TO_INR = BigDecimal.valueOf(0.59);

    public BigDecimal convertToINR(
            BigDecimal amount,
            String currency
    ) {

        if (currency == null) {
            return amount;
        }

        return switch (currency.toUpperCase()) {

            case "USD" -> amount.multiply(USD_TO_INR);

            case "EUR" -> amount.multiply(EUR_TO_INR);

            case "GBP" -> amount.multiply(GBP_TO_INR);

            case "JPY" -> amount.multiply(JPY_TO_INR);

            default -> amount;

        };
    }
}