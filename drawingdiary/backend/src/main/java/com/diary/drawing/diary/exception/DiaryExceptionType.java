package com.diary.drawing.diary.exception;

import org.springframework.http.HttpStatus;

import com.diary.drawing.exception.BaseExceptionType;


// 여기서 다루는거: valid로 못하는 것들
public enum DiaryExceptionType implements BaseExceptionType {
    //== 다이어리 추가 ==//
    NOT_FOUND_IMAGE(404, HttpStatus.NOT_FOUND, "이미지 정보가 없습니다."),
    NOT_FOUND_MEMBER(602, HttpStatus.BAD_REQUEST, "회원 정보가 없습니다.");


    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMessage;

    DiaryExceptionType(int errorCode, HttpStatus httpStatus, String errorMessage) {
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
    }

    @Override
    public int getErrorCode() {
        return this.errorCode;
    }

    @Override
    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }

    @Override
    public String getErrorMessage() {
        return this.errorMessage;
    }
}
