package com.diary.drawing.diary.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.diary.domain.Date;
import com.diary.drawing.diary.domain.Diary;


@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long>{
    Optional<Diary> findByDate(Date date); // Optional: findBy로 조회했을 때 객체가 존재하지 않는 경우 처리
    Diary findByDiaryID(Long diaryID);
    List<Diary> findByAlbum(Album album);
}
