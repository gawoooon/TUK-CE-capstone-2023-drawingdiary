package com.diary.drawing.domain.imagestyle.service;
import org.springframework.stereotype.Service;

import com.diary.drawing.domain.imagestyle.domain.ImageStyle;
import com.diary.drawing.domain.imagestyle.repository.ImageStyleRepository;
import com.diary.drawing.domain.user.service.ValidateMemberService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ImageStyleService {

    private final ImageStyleRepository imageStyleRepository;
    private ValidateMemberService validateMemberService;

    public ImageStyle validateStyle(String styleName){
        ImageStyle style = imageStyleRepository.findByStyleName(styleName);
        if(style == null){
            throw new RuntimeException(" 존재하지 않는 스타일: " + styleName);
        }
        return style;
    }
    
    
}
