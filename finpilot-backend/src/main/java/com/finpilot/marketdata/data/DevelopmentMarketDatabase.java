package com.finpilot.marketdata.data;

import com.finpilot.common.enums.AssetType;
import com.finpilot.marketdata.dto.MarketQuote;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class DevelopmentMarketDatabase {

    private final Map<String, MarketQuote> marketData = new HashMap<>();

    public DevelopmentMarketDatabase() {
        loadData();
    }

    private void loadData() {

        /* =========================================================
                        INDIAN STOCKS (20)
           ========================================================= */

        addAsset("TCS", AssetType.STOCK, "Tata Consultancy Services", "NSE", "INR", 3952.80);
        addAsset("INFY", AssetType.STOCK, "Infosys", "NSE", "INR", 1589.40);
        addAsset("RELIANCE", AssetType.STOCK, "Reliance Industries", "NSE", "INR", 1521.65);
        addAsset("MARUTI", AssetType.STOCK, "Maruti Suzuki", "NSE", "INR", 13741.75);
        addAsset("SBIN", AssetType.STOCK, "State Bank of India", "NSE", "INR", 891.40);
        addAsset("HDFCBANK", AssetType.STOCK, "HDFC Bank", "NSE", "INR", 1825.70);
        addAsset("ICICIBANK", AssetType.STOCK, "ICICI Bank", "NSE", "INR", 1476.80);
        addAsset("LT", AssetType.STOCK, "Larsen & Toubro", "NSE", "INR", 3674.20);
        addAsset("ITC", AssetType.STOCK, "ITC Limited", "NSE", "INR", 432.15);
        addAsset("WIPRO", AssetType.STOCK, "Wipro", "NSE", "INR", 268.60);
        addAsset("BHARTIARTL", AssetType.STOCK, "Bharti Airtel", "NSE", "INR", 1934.70);
        addAsset("AXISBANK", AssetType.STOCK, "Axis Bank", "NSE", "INR", 1218.25);
        addAsset("KOTAKBANK", AssetType.STOCK, "Kotak Mahindra Bank", "NSE", "INR", 2143.90);
        addAsset("HCLTECH", AssetType.STOCK, "HCL Technologies", "NSE", "INR", 1845.50);
        addAsset("ASIANPAINT", AssetType.STOCK, "Asian Paints", "NSE", "INR", 2478.30);
        addAsset("SUNPHARMA", AssetType.STOCK, "Sun Pharmaceutical", "NSE", "INR", 1789.80);
        addAsset("TITAN", AssetType.STOCK, "Titan Company", "NSE", "INR", 3689.60);
        addAsset("BAJFINANCE", AssetType.STOCK, "Bajaj Finance", "NSE", "INR", 9526.50);
        addAsset("ULTRACEMCO", AssetType.STOCK, "UltraTech Cement", "NSE", "INR", 12130.40);
        addAsset("POWERGRID", AssetType.STOCK, "Power Grid Corporation", "NSE", "INR", 318.20);

        /* =========================================================
                        US STOCKS (10)
           ========================================================= */

        addAsset("AAPL", AssetType.STOCK, "Apple Inc.", "NASDAQ", "USD", 212.45);
        addAsset("MSFT", AssetType.STOCK, "Microsoft Corporation", "NASDAQ", "USD", 497.35);
        addAsset("NVDA", AssetType.STOCK, "NVIDIA Corporation", "NASDAQ", "USD", 172.41);
        addAsset("AMZN", AssetType.STOCK, "Amazon.com Inc.", "NASDAQ", "USD", 219.81);
        addAsset("META", AssetType.STOCK, "Meta Platforms", "NASDAQ", "USD", 732.15);
        addAsset("TSLA", AssetType.STOCK, "Tesla Inc.", "NASDAQ", "USD", 348.67);
        addAsset("NFLX", AssetType.STOCK, "Netflix Inc.", "NASDAQ", "USD", 1326.52);
        addAsset("AMD", AssetType.STOCK, "Advanced Micro Devices", "NASDAQ", "USD", 176.45);
        addAsset("INTC", AssetType.STOCK, "Intel Corporation", "NASDAQ", "USD", 23.48);
        addAsset("IBM", AssetType.STOCK, "International Business Machines", "NYSE", "USD", 287.40);

        /* =========================================================
                                ETFs (10)
           ========================================================= */

        addAsset("SPY", AssetType.ETF, "SPDR S&P 500 ETF", "NYSE", "USD", 728.99);
        addAsset("QQQ", AssetType.ETF, "Invesco QQQ Trust", "NASDAQ", "USD", 643.12);
        addAsset("VOO", AssetType.ETF, "Vanguard S&P 500 ETF", "NYSE", "USD", 596.84);
        addAsset("VTI", AssetType.ETF, "Vanguard Total Stock Market ETF", "NYSE", "USD", 319.77);
        addAsset("DIA", AssetType.ETF, "SPDR Dow Jones ETF", "NYSE", "USD", 449.25);
        addAsset("IWM", AssetType.ETF, "iShares Russell 2000 ETF", "NYSE", "USD", 242.16);
        addAsset("XLK", AssetType.ETF, "Technology Select Sector SPDR", "NYSE", "USD", 278.41);
        addAsset("XLF", AssetType.ETF, "Financial Select Sector SPDR", "NYSE", "USD", 52.81);
        addAsset("ARKK", AssetType.ETF, "ARK Innovation ETF", "NYSE", "USD", 73.24);
        addAsset("VGT", AssetType.ETF, "Vanguard Information Technology ETF", "NYSE", "USD", 688.55);
    }

    private void addAsset(
            String symbol,
            AssetType assetType,
            String companyName,
            String exchange,
            String currency,
            double price
    ) {

        marketData.put(
                symbol.toUpperCase(),
                MarketQuote.builder()
                        .symbol(symbol.toUpperCase())
                        .exchange(exchange)
                        .assetType(assetType)
                        .companyName(companyName)
                        .currency(currency)
                        .currentPrice(BigDecimal.valueOf(price))
                        .lastUpdated(LocalDateTime.now())
                        .source("DEVELOPMENT")
                        .build()
        );
    }

    public MarketQuote getQuote(String symbol) {

        return marketData.get(symbol.toUpperCase());

    }

    public boolean contains(String symbol) {

        return marketData.containsKey(symbol.toUpperCase());

    }
}