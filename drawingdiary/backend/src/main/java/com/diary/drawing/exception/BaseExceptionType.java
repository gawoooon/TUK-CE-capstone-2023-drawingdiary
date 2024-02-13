package com.diary.drawing.exception;

import org.springframework.http.HttpStatus;


// 오류 메세지를 code + 상태 + 메세지로

public interface BaseExceptionType {
    int getErrorCode();

    HttpStatus getHttpStatus();

    String getErrorMessage();
}
