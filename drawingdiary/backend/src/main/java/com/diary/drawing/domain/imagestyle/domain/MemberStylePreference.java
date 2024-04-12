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
@Table(name = "MemberStylePreference")
public class MemberStylePreference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long preferenceID;

    private int frequency;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러개의 취향 테이블 한명의 유저
    @JoinColumn(name = "memberID") // 외부키 references from UserID
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러개의 취향 테이블 한개의 스타일
    @JoinColumn(name = "styleID") // 외부키 references from styleID
    private ImageStyle imageStyle;

    @Builder
    public MemberStylePreference(int frequency, Member member, ImageStyle imageStyle){
        this.frequency = frequency;
        this.member = member;
        this.imageStyle = imageStyle;
    }

    // 업데이트
    public void updateFrequency(){
        this.frequency++;
    }
}
