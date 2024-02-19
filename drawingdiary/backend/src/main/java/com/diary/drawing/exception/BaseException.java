package com.diary.drawing.exception;


// 앞으로 정의할 모든 커스텀 예외의 부모 클래스, BaseException 타입으로 처리할 수 있도록 만들어줌

public abstract class BaseException extends RuntimeException{
    public abstract BaseExceptionType getExceptionType();
    
}
