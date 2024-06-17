package com.diary.drawing.global.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.diary.drawing.domain.album.exception.AlbumExceptionType;
import com.diary.drawing.domain.album.exception.AlbumResponseException;
import com.diary.drawing.domain.diary.exception.DiaryExceptionType;
import com.diary.drawing.domain.diary.exception.DiaryResponseException;
import com.diary.drawing.domain.user.exception.MemberExceptionType;
import com.diary.drawing.domain.user.exception.MemberResponseException;
import com.diary.drawing.global.jwt.exception.authExceptionType;
import com.diary.drawing.global.jwt.exception.authResponseException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);


    /* MemberResponseException */
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

    /* DiaryResponseException */
    @SuppressWarnings("null")
    @ExceptionHandler(DiaryResponseException.class)
    public ResponseEntity<ErrorResponse> handleDiaryException(DiaryResponseException ex) {
        DiaryExceptionType exceptionType =(DiaryExceptionType) ex.getExceptionType();
        
        // 로깅 추가
        log.error("DiaryResponseException 발생, 유형: {}, 메시지: {}", exceptionType.getErrorCode(), exceptionType.getErrorMessage());

        ErrorResponse errorResponse = new ErrorResponse(
            exceptionType.getErrorCode(),
            exceptionType.getErrorMessage()
        );
        
        // ResponseEntity를 사용하여 에러 응답과 HTTP 상태 코드를 반환
        return new ResponseEntity<>(errorResponse, exceptionType.getHttpStatus());
    }

        /* AlbumResponseException */
    @SuppressWarnings("null")
    @ExceptionHandler(AlbumResponseException.class)
    public ResponseEntity<ErrorResponse> handleMemberResponseException(AlbumResponseException ex) {
        AlbumExceptionType exceptionType =(AlbumExceptionType) ex.getExceptionType();
        
        // 로깅 추가
        log.error("AlbumResponseException 발생, 유형: {}, 메시지: {}", exceptionType.getErrorCode(), exceptionType.getErrorMessage());

        ErrorResponse errorResponse = new ErrorResponse(
            exceptionType.getErrorCode(),
            exceptionType.getErrorMessage()
        );
        
        // ResponseEntity를 사용하여 에러 응답과 HTTP 상태 코드를 반환
        return new ResponseEntity<>(errorResponse, exceptionType.getHttpStatus());
    }

    /* authResponseException */
    @ExceptionHandler(authResponseException.class)
    public ResponseEntity<ErrorResponse> handleAuthResponseException(authResponseException ex) {
        authExceptionType exceptionType = (authExceptionType) ex.getExceptionType();
        
        // 로깅 추가
        log.error("AuthResponseException 발생, 유형: {}, 메시지: {}", exceptionType.getErrorCode(), exceptionType.getErrorMessage());

        ErrorResponse errorResponse = new ErrorResponse(
            exceptionType.getErrorCode(),
            exceptionType.getErrorMessage()
        );

        // 에러 응답과 HTTP 상태 코드를 반환합니다.
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
