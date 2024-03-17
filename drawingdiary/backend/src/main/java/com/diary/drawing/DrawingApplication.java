package com.diary.drawing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.diary.drawing.global.jwt.repository.RefreshTokenRepository;



@EnableJpaAuditing
@EnableJpaRepositories(
        basePackages = "com.diary.drawing",
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE, classes = RefreshTokenRepository.class))
@SpringBootApplication()
public class DrawingApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(DrawingApplication.class, args);
    }
}
