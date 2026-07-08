package com.finpilot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class FinpilotBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinpilotBackendApplication.class, args);
	}

}
