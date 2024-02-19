package com.diary.drawing.imagestyle.domain;

import com.diary.drawing.user.domain.Member;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Table(name = "StyleSelectHistory")
public class StyleSelectHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long selectHistoryID;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러 선택 이력과 한명의 멤버
    @JoinColumn(name = "memberID") // 외부키 references from memberID
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러 선택 이력과 한개의 이미지 스타일
    @JoinColumn(name = "styleID") // 외부키 references from styleID
    private ImageStyle imageStyle;

    /* 다이어리에서 select style */
    private Long selectStyleID;

    /* predictedStyleID */
    private Long predictedStyle1;

    private Long predictedStyle2;

    private Long predictedStyle3;

    private Long predictedStyle4;

    @Builder
    public StyleSelectHistory(Member member, Long selectStyleID, Long predictedStyle1, Long predictedStyle2, Long predictedStyle3, Long predictedStyle4){
        this.member=member;
        this.selectStyleID=selectStyleID;
        this.predictedStyle1=predictedStyle1;
        this.predictedStyle2=predictedStyle2;
        this.predictedStyle3=predictedStyle3;
        this.predictedStyle4=predictedStyle4;
    }


}
