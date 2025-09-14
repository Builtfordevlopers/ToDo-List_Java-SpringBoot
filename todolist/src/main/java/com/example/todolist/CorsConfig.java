package com.example.todolist;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(
                            "https://to-do-list-java-spring-boot.vercel.app",
                            "https://to-do-list-java-spring-boot-git-main-builtfordevlopers-projects.vercel.app",
                            "https://to-do-list-java-spring-boot-e35a59jcr.vercel.app" // Add this new URL
)
                        .allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
