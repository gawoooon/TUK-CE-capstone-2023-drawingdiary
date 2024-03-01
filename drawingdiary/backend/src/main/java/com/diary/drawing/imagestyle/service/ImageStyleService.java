package com.diary.drawing.imagestyle.service;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.diary.drawing.imagestyle.domain.ImageStyle;
import com.diary.drawing.imagestyle.dto.PredictRequestDTO;
import com.diary.drawing.imagestyle.repository.ImageStyleRepository;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.service.ValidateMemberService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ImageStyleService {

    private final ImageStyleRepository imageStyleRepository;
    private ValidateMemberService validateMemberService;


    /* "http://localhost:5001/api/get-styles" 로 스타일 받아서 저장하기 */
    public ResponseEntity<String[]> getStyles (PredictRequestDTO PredictRequestDTO, Long memberID){
        Member member = validateMemberService.validateMember(memberID);
        //member로 받기

        //member로 respository 검색해서 없으면 새로 만듬

        // 뭐뭐해서 string 5개로 내용 받음
        String[] getStyles= {"1", "2", "3", "4", "5"};

        //repository에 저장함
        
        // 5개 싹다 validateStyle() 안걸리면
        return ResponseEntity.ok(getStyles);

    }

    public ImageStyle validateStyle(String styleName){
        ImageStyle style = imageStyleRepository.findByStyleName(styleName);
        if(style == null){
            throw new RuntimeException(" 존재하지 않는 스타일: " + styleName);
        }
        return style;
    }
    
    
}
