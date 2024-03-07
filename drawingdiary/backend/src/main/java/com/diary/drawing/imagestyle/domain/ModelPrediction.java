package com.diary.drawing.imagestyle.domain;

import java.util.List;

import com.diary.drawing.user.domain.Member;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "ModelPrediction")
public class ModelPrediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long predictionID;

    @OneToOne(fetch = FetchType.LAZY)  // 예측 취향 테이블과 한명의 유저
    @JoinColumn(name = "memberID") // 외부키 references from UserID
    private Member member;

    @NotBlank
    private String style1;

    @NotBlank
    private String style2;

    @NotBlank
    private String style3;

    @NotBlank
    private String style4;

    @NotBlank
    private String style5;

    @Builder
    public ModelPrediction(Member member, String style1, String style2, String style3, String style4, String style5){
        this.member=member;
        this.style1 = style1;
        this.style2 = style2;
        this.style3 = style3;
        this.style4 = style4;
        this.style5 = style5;
    }

    public void update(List<String> styles){
        this.style1 = styles.get(0);
        this.style2 = styles.get(1);
        this.style3 = styles.get(2);
        this.style4 = styles.get(3);
        this.style5 = styles.get(4);
    }


}
