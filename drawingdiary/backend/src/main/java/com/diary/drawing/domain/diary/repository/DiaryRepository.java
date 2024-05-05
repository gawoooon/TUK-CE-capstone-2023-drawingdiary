package com.diary.drawing.domain.diary.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import com.diary.drawing.domain.diary.domain.Diary;
import com.diary.drawing.domain.user.domain.Member;


@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long>{
    Diary findByDiaryID(Long diaryID);

    Optional<Diary> findByDateAndMember(LocalDate date, Member member);

    boolean existsByDateAndMember(LocalDate date, Member member);

    @Query("SELECT d FROM Diary d WHERE d.member = :member AND d.date BETWEEN :startDate AND :endDate")
    List<Diary> findByMemberAndDateBetween(@Param("member") Member member, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);


}


