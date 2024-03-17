package com.diary.drawing.domain.diary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.domain.album.domain.Album;
import com.diary.drawing.domain.diary.domain.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{

    Image findByImageID(Long imageID);
    List<Image> findByAlbum(Album album);
}
    
