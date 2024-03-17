package com.diary.drawing.domain.album.exception;

import org.springframework.http.HttpStatus;

import com.diary.drawing.global.exception.BaseExceptionType;


// 여기서 다루는거: valid로 못하는 것들
public enum AlbumExceptionType implements BaseExceptionType {
    //== 앨범 추가 ==//
    ALREADY_EXIST_ALBUMNAME(600, HttpStatus.BAD_REQUEST, "이미 존재하는 앨범명입니다."),
    TRY_DELETE_BASICALBUM(600, HttpStatus.BAD_REQUEST, "삭제할 수 없는 앨범입니다."),
    NOT_FOUND_MEMBER(602, HttpStatus.NOT_FOUND, "회원 정보가 없습니다."),
    UNAUTHORIZED_DELETION(403, HttpStatus.FORBIDDEN, "권한이 없는 사용자가 앨범 삭제를 요청했습니다."),
    NOT_FOUND_ALBUM(404, HttpStatus.NOT_FOUND, "이미 삭제되었거나 존재하지 않는 앨범입니다");



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
