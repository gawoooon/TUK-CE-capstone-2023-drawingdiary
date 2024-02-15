package com.diary.drawing.imagestyle.domain;

import com.diary.drawing.user.domain.Member;

import jakarta.persistence.Entity;
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
@Table(name = "ModelPrediction")
public class ModelPrediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long predictionID;

    @ManyToOne  // 예측 취향 테이블과 한명의 유저
    @JoinColumn(name = "memberID") // 외부키 references from UserID
    private Member member;

    /* predictedStyleID */
    private Long predictedStyle1;

    private Long predictedStyle2;

    private Long predictedStyle3;

    private Long predictedStyle4;

    @Builder
    public ModelPrediction(Member member, Long predictedStyle1, Long predictedStyle2, Long predictedStyle3, Long predictedStyle4){
        this.member=member;
        this.predictedStyle1=predictedStyle1;
        this.predictedStyle2=predictedStyle2;
        this.predictedStyle3=predictedStyle3;
        this.predictedStyle4=predictedStyle4;
    }


}
