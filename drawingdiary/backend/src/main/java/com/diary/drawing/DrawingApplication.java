package com.diary.drawing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// @EnableJpaRepositories("com.diary.template")
@EnableJpaAuditing
@SpringBootApplication()

public class DrawingApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(DrawingApplication.class, args);
    }
}
