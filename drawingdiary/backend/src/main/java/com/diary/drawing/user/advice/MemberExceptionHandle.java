package com.diary.drawing.user.advice;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


// 회원가입 시, 혹은 추가 시에 (member 저장할때) 틀린 부분만 에러로 출력하는 예외처리
@RestControllerAdvice
public class MemberExceptionHandle {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleException(MethodArgumentNotValidException exception){
        //string, string으로 map, hashmap은 key, value 형태
        Map<String, String> errorMap = new HashMap<>();
        //결과값에 따라 여러개의 에러를 각각의 필드에서 잡기
        exception.getBindingResult().getFieldErrors().forEach(error -> {
            //에러나면 -> 에러맵에 저장함
            errorMap.put(error.getField(), error.getDefaultMessage());
        });

        return errorMap;
    }
    
}
