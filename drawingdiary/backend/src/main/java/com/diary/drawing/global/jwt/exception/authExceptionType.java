package com.diary.drawing.global.jwt.exception;

import org.springframework.http.HttpStatus;

import com.diary.drawing.global.exception.BaseExceptionType;


// 여기서 다루는거: valid로 못하는 것들
public enum authExceptionType implements BaseExceptionType {
    //== 로그인 시 ==//
    WRONG_PASSWORD(601,HttpStatus.CONFLICT, "비밀번호가 잘못되었습니다."),
    NOT_FOUND_MEMBER(602, HttpStatus.CONFLICT, "회원 정보가 없습니다."),

    //== 토큰 ==//
    WRONG_REFRESHTOKEN(400, HttpStatus.BAD_REQUEST, "다시 로그인해주세요."),
    WRONG_VALIDATION(600, HttpStatus.BAD_REQUEST, "서비스 문제입니다."),
    EXPIRED_TOKEN(401, HttpStatus.UNAUTHORIZED, "만료된 토큰입니다.");


    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMessage;

    authExceptionType(int errorCode, HttpStatus httpStatus, String errorMessage) {
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
