package com.template.drawing.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

<<<<<<< HEAD:drawingdiary/backend/src/main/java/com/template/drawing/user/DrawingApplication.java

@EnableJpaRepositories("com.template.drawing.user.repository")
@SpringBootApplication
=======
@EnableJpaRepositories("com.diary.drawing.user")
@SpringBootApplication()
>>>>>>> ebf0b6e16ec2d3a5096dd7e86026c8ecca279203:drawingdiary/backend/src/main/java/com/diary/drawing/user/DrawingApplication.java

public class DrawingApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(DrawingApplication.class, args);
    }
}
