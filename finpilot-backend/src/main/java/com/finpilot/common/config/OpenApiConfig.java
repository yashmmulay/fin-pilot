package com.finpilot.common.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI finPilotOpenAPI() {

        final String securitySchemeName = "Bearer Authentication";

        return new OpenAPI()

                .info(new Info()
                        .title("FinPilot API")
                        .description("""
                                FinPilot is a personal finance portfolio management platform.
                                
                                Features:
                                • JWT Authentication
                                • Portfolio Management
                                • Stocks
                                • ETFs
                                • Mutual Funds
                                • Watchlist
                                • Financial Goals
                                • Risk Alerts
                                • Dashboard Analytics
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Yash Mulay")
                                .email("your-email@example.com"))
                        .license(new License()
                                .name("MIT License")))

                .externalDocs(new ExternalDocumentation()
                        .description("FinPilot GitHub Repository"))

                .addSecurityItem(
                        new SecurityRequirement()
                                .addList(securitySchemeName)
                )

                .schemaRequirement(
                        securitySchemeName,
                        new SecurityScheme()
                                .name(securitySchemeName)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                );
    }
}