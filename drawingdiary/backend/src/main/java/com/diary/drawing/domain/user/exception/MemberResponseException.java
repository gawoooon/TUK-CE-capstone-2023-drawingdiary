package com.diary.drawing.domain.user.exception;

import com.diary.drawing.global.exception.BaseException;
import com.diary.drawing.global.exception.BaseExceptionType;

public class MemberResponseException extends BaseException{
    private BaseExceptionType exceptionType;    // 멤버변수

    // 생성하는 순간 type이 base 형식으로 설정
    public MemberResponseException(BaseExceptionType exceptionType){
        this.exceptionType = exceptionType;
    }

    // 타입 넘겨주기
    @Override
    public BaseExceptionType getExceptionType(){
        return exceptionType;
    }

}
