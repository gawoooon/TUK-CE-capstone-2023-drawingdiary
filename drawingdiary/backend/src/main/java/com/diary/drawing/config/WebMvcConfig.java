package com.diary.drawing.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer{

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**") // /api allow all
                .allowedOrigins("http://locahost:3000") //react
                .allowedMethods("*") // 일단 다 해놨음
                .allowCredentials(true); // 프런트에서도 수정
    }
    
}
