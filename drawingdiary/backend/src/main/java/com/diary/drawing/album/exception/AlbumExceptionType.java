package com.diary.drawing.album.exception;

import org.springframework.http.HttpStatus;

import com.diary.drawing.exception.BaseExceptionType;


// 여기서 다루는거: valid로 못하는 것들
public enum AlbumExceptionType implements BaseExceptionType {
    //== 앨범 추가 ==//
    ALREADY_EXIST_ALBUMNAME(600, HttpStatus.OK, "이미 존재하는 앨범명입니다."),
    NOT_FOUND_MEMBER(602, HttpStatus.OK, "회원 정보가 없습니다.");


    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMessage;

    AlbumExceptionType(int errorCode, HttpStatus httpStatus, String errorMessage) {
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
