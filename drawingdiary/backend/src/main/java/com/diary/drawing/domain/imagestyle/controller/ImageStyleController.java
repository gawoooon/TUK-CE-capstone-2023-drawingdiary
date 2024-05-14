package com.diary.drawing.domain.imagestyle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.domain.imagestyle.service.PredictStyleService;
import com.diary.drawing.global.jwt.domain.PrincipalDetails;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Style", description = "Style API")
@RestController
public class ImageStyleController {

    @Autowired
    private PredictStyleService predictStyleService;

    /* 스타일 받아서 저장하기
     *
     *  param / int age, char gender
     */
    @Operation(summary = "스타일 추천 받아서 저장, 추천 리스트 반환까지")
    @PostMapping("/api/style")
    public ResponseEntity<?> PredictStyle(@AuthenticationPrincipal PrincipalDetails principalDetails){
        return predictStyleService.saveStyles(principalDetails.getMemberID());
    }

    @Operation(summary = "스타일 이미 저장된 내용 조회만")
    @GetMapping("/api/test/style")
    public ResponseEntity<?> getExistPrediction(@AuthenticationPrincipal PrincipalDetails principalDetails){
        return predictStyleService.getExistPrediction(principalDetails.getMemberID());
    }


    
    
}
