package com.diary.drawing.global.jwt.exception;


import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class authExceptionHandler {

    @ExceptionHandler(authResponseException.class)
    public ResponseEntity<?> handleAuthResponseException(authResponseException e) {
        // 예외 타입에 따라 적절한 HTTP 상태 코드와 에러 메시지를 설정합니다.
        HttpStatus status = e.getExceptionType().getHttpStatus();
        String message = e.getExceptionType().getErrorMessage();

        // 에러 응답을 생성합니다.
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("status", status.value());
        errorResponse.put("error", status.getReasonPhrase());
        errorResponse.put("message", message);

        // 에러 응답과 HTTP 상태 코드를 반환합니다.
        return new ResponseEntity<>(errorResponse, status);
    }
}