package com.diary.drawing.album.domain;

import com.diary.drawing.user.domain.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Album")
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long albumID;

    @Column(length = 50)
    private String albumName;
    
    @ManyToOne  // 한명의 멤버가 여러개의 앨범을 가질 수 있다.
    @JoinColumn(name = "memberID") // 외부키 references from UserID
    private Member member;

    public Album(){}


    // 빌더
    @Builder
    public Album(String albumName, Member member){
        this.albumName = albumName;
        this.member = member;
    }

}
