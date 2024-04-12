package com.diary.drawing.domain.imagestyle.service;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.domain.imagestyle.domain.ImageStyle;
import com.diary.drawing.domain.imagestyle.domain.MemberStylePreference;
import com.diary.drawing.domain.imagestyle.domain.ModelPrediction;
import com.diary.drawing.domain.imagestyle.domain.StyleSelectHistory;
import com.diary.drawing.domain.imagestyle.repository.ImageStyleRepository;
import com.diary.drawing.domain.imagestyle.repository.MemberStylePreferenceRespository;
import com.diary.drawing.domain.imagestyle.repository.StyleSelectRespository;
import com.diary.drawing.domain.user.domain.Member;
import com.diary.drawing.domain.user.service.ValidateMemberService;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ImageStyleService {

    private final MemberStylePreferenceRespository stylePreferenceRespository;
    private final StyleSelectRespository historyRespository;
    private final ImageStyleRepository imageStyleRepository;
    private final PredictStyleService predictStyleService;
    private ValidateMemberService validateMemberService;

    // 이미지 스타일 이름으로 style 객체 반환
    public ImageStyle validateStyle(String styleName){
        ImageStyle style = imageStyleRepository.findByStyleName(styleName);
        if(style == null){
            throw new RuntimeException(" 존재하지 않는 스타일: " + styleName);
        }
        return style;
    }

    // MemberStylePreference 작성
    // style에 따른 컬럼이 존재하면 수정하고, 존재하지 않으면 새로 생성한다.

    @Transactional
    public void updateStylePreference(ImageStyle style, Member member){
        Optional<MemberStylePreference> stylePreference = stylePreferenceRespository.findByImageStyleAndMember(style, member);
        if(stylePreference.isEmpty()){
            MemberStylePreference newStylePreference = MemberStylePreference.builder()
                .frequency(1)
                .member(member)
                .imageStyle(style)
                .build();
            stylePreferenceRespository.save(newStylePreference);
        } else {
            stylePreference.get().updateFrequency();
        }
    }

    @Transactional
    public void updateSelectHistory(ImageStyle style, Member member){
        ModelPrediction prediction = predictStyleService.validatePrediction(member.getMemberID());
        StyleSelectHistory history = StyleSelectHistory.builder()
        .member(member)
        .selectStyle(style.getStyleName())
        .predictedStyle1(prediction.getStyle1())
        .predictedStyle2(prediction.getStyle2())
        .predictedStyle3(prediction.getStyle3())
        .predictedStyle4(prediction.getStyle4())
        .predictedStyle5(prediction.getStyle5())
        .build();

        historyRespository.save(history);
    }

}
