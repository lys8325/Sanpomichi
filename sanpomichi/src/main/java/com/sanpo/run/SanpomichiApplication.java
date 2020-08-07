package com.sanpo.run;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@Configuration
@EnableAutoConfiguration
@ComponentScan({"com.sanpo"})
@EntityScan({"com.sanpo.entity"})
@EnableJpaRepositories(basePackages="com.sanpo")
@PropertySource("classpath:application.properties")
@SpringBootApplication
public class SanpomichiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SanpomichiApplication.class, args);
	}

}
