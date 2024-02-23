package com.diary.drawing.diary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.diary.domain.Diary;


@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long>{
    Diary findByDiaryID(Long diaryID);
    List<Diary> findByAlbum(Album album);
}
