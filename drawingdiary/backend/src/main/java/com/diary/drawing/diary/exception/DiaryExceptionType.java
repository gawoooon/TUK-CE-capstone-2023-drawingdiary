package com.diary.drawing.diary.exception;

import org.springframework.http.HttpStatus;

import com.diary.drawing.exception.BaseExceptionType;


// 여기서 다루는거: valid로 못하는 것들
public enum DiaryExceptionType implements BaseExceptionType {
    //== 다이어리 추가 ==//
    NOT_EXIST_CONTEXT(400, HttpStatus.BAD_REQUEST, "수정된 정보가 없습니다."),
    NOT_FOUND_DIARY(404, HttpStatus.NOT_FOUND, "일기 정보가 없습니다."),
    NOT_FOUND_ALBUM(404, HttpStatus.NOT_FOUND, "앨범 정보가 없습니다."),
    NOT_FOUND_IMAGE(404, HttpStatus.NOT_FOUND, "이미지 정보가 없습니다."),
    NOT_FOUND_COMMENT(404, HttpStatus.NOT_FOUND, "코멘트 정보가 없습니다."),
    NOT_FOUND_SENTIMENT(404, HttpStatus.NOT_FOUND, "감정분석 정보가 없습니다."),
    NOT_FOUND_DATE(404, HttpStatus.NOT_FOUND, "잘못된 날짜가 입력되었습니다."),

    UNAUTHERIZED_MEMBER(602, HttpStatus.UNAUTHORIZED, "작성자가 아닌 다른 회원이 수정 요청했습니다."),
    NOT_FOUND_MEMBER(401, HttpStatus.BAD_REQUEST, "회원 정보가 없습니다.");


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
