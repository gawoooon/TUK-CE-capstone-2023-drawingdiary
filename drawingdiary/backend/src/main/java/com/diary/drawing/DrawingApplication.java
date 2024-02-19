package com.diary.drawing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EnableJpaAuditing
@EnableJpaRepositories("com.diary.drawing")
@SpringBootApplication()
public class DrawingApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(DrawingApplication.class, args);
    }
}
