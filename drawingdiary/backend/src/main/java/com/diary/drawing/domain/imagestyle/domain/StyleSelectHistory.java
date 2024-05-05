package com.diary.drawing.domain.imagestyle.domain;

import com.diary.drawing.domain.user.domain.Member;

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

    /* 다이어리에서 select style */
    private String selectStyle;

    /* predictedStyleID */
    private String predictedStyle1;

    private String predictedStyle2;

    private String predictedStyle3;

    private String predictedStyle4;

    private String predictedStyle5;

    @Builder
    public StyleSelectHistory(Member member, String selectStyle, String predictedStyle1, String predictedStyle2,
    String predictedStyle3, String predictedStyle4, String predictedStyle5){
        this.member=member;
        this.selectStyle=selectStyle;
        this.predictedStyle1=predictedStyle1;
        this.predictedStyle2=predictedStyle2;
        this.predictedStyle3=predictedStyle3;
        this.predictedStyle4=predictedStyle4;
        this.predictedStyle5=predictedStyle5;
    }


}
