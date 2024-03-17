package com.diary.drawing.domain.user.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @SuppressWarnings("null")
    @ExceptionHandler(MemberResponseException.class)
    public ResponseEntity<ErrorResponse> handleMemberResponseException(MemberResponseException ex) {
        MemberExceptionType exceptionType =(MemberExceptionType) ex.getExceptionType();
        
        // 로깅 추가
        log.error("MemberResponseException 발생, 유형: {}, 메시지: {}", exceptionType.getErrorCode(), exceptionType.getErrorMessage());

        ErrorResponse errorResponse = new ErrorResponse(
            exceptionType.getErrorCode(),
            exceptionType.getErrorMessage()
        );
        
        // ResponseEntity를 사용하여 에러 응답과 HTTP 상태 코드를 반환
        return new ResponseEntity<>(errorResponse, exceptionType.getHttpStatus());
    }
    
    // ErrorResponse 클래스는 예외 응답을 위한 포맷을 정의합니다.
    public static class ErrorResponse {
        private int errorCode;
        private String message;

        public ErrorResponse(int errorCode, String message) {
            this.errorCode = errorCode;
            this.message = message;
        }

        // Getter
        public int getErrorCode() {
            return errorCode;
        }

        public String getMessage() {
            return message;
        }

        // Setter
        public void setErrorCode(int errorCode) {
            this.errorCode = errorCode;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
