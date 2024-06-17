package com.diary.drawing.global.jwt.exception;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        AuthExceptionType exceptionType = determineExceptionType(authException);
        HttpStatus status = exceptionType.getHttpStatus();
        String message = exceptionType.getErrorMessage();

        response.setStatus(status.value());
        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write("{\"status\":" + status.value() +
            ", \"error\": \"" + status.getReasonPhrase() +
            "\", \"message\": \"" + message + "\"}");
    }

    /* 구분했으나, UsernameNotFoundException이 뜨게 되면 BadCredentialsException 리턴 */
    private AuthExceptionType determineExceptionType(AuthenticationException exception) {
        if (exception instanceof UsernameNotFoundException) {
            return AuthExceptionType.NOT_FOUND_MEMBER;
        } else if (exception instanceof BadCredentialsException) {
            return AuthExceptionType.WRONG_PASSWORD;
        } else {
            return AuthExceptionType.WRONG_VALIDATION;
        }
    }
}
