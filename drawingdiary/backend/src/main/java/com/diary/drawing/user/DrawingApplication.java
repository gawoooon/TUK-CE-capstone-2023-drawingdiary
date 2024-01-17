package com.diary.drawing.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("com.diary.drawing.user.repository")
@SpringBootApplication()

public class DrawingApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(DrawingApplication.class, args);
    }
}
