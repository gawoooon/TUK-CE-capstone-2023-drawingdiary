package com.diary.drawing.diary.repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.user.domain.Member;


@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long>{
    Diary findByDiaryID(Long diaryID);
    List<Diary> findByAlbum(Album album);
    Optional<Diary> findByDateAndMember(Date date, Member member);
    List<Diary> findByDateBetween(Date startDate, Date endDate);
}
