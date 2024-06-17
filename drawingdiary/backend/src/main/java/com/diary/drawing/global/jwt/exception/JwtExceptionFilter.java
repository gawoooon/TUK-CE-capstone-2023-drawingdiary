package com.diary.drawing.global.jwt.exception;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtExceptionFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (AuthResponseException e) {
            handleAuthException(e, response);
        }
    }

    private void handleAuthException(AuthResponseException e, HttpServletResponse response) throws IOException {
        HttpStatus status = e.getExceptionType().getHttpStatus();
        String message = e.getExceptionType().getErrorMessage();
        
        response.setStatus(status.value());
        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write("{\"status\":" + status.value() +
            ", \"error\": \"" + status.getReasonPhrase() +
            "\", \"message\": \"" + message + "\"}");
    }
}

