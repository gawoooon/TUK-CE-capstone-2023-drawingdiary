package com.diary.drawing.domain.user.exception;

import org.springframework.http.HttpStatus;

import com.diary.drawing.global.exception.BaseExceptionType;


// 여기서 다루는거: valid로 못하는 것들
public enum MemberExceptionType implements BaseExceptionType {
    //== 회원가입, 로그인 시 ==// [지원 추가 수정]
    ALREADY_EXIST_EMAIL(600, HttpStatus.CONFLICT, "이미 존재하는 아이디입니다."), // OK -> CONFLICT
    FAIL_PHONE_VERIFIED(700, HttpStatus.NOT_FOUND, "핸드폰 인증에 실패했습니다."),
    ALREADY_EXIST_PHONENUMBER(602, HttpStatus.CONFLICT, "이미 존재하는 핸드폰 번호입니다."), // OK -> CONFLICT
    WRONG_PASSWORD(601,HttpStatus.UNAUTHORIZED, "비밀번호가 잘못되었습니다."), // OK -> UNAUTHORIZED
    ERROR_GET_MEMBER(404, HttpStatus.NOT_FOUND, "회원 정보를 받아올 수 없습니다."),
    ERROR_UPDATE_PROFILEIMAGE(415, HttpStatus.NOT_FOUND, "프로필 이미지 업로드에 실패했습니다."),
    NOT_FOUND_MEMBER(404, HttpStatus.NOT_FOUND, "회원 정보가 없습니다."); // OK -> NOT_FOUND


    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMessage;

    MemberExceptionType(int errorCode, HttpStatus httpStatus, String errorMessage) {
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
