package com.diary.drawing.domain.diary.domain;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.diary.drawing.domain.album.domain.Album;
import com.diary.drawing.global.common.BaseTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Image")
public class Image extends BaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageID;

    @Column(length = 600)
    private String imageFile;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러 이미지와 하나의 앨범
    @JoinColumn(name = "albumID") // 외부키 references from albumid
    private Album album;
 

    

    @Builder
    public Image(String imageFile, Album album, LocalDate date){
        this.imageFile = imageFile;
        this.album = album;
        this.date = date;
    }

    // Date 안넣어도 됨
    public void update(String imageFile, Album album){
        this.imageFile = imageFile;
        this.album = album;
    }
    
    public void setAlbum(Album album){
        this.album = album;
    }
}
