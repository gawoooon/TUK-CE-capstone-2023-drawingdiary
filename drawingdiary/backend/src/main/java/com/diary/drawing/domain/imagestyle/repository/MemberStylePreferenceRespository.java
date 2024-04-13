package com.diary.drawing.domain.imagestyle.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.diary.drawing.domain.imagestyle.domain.ImageStyle;
import com.diary.drawing.domain.imagestyle.domain.MemberStylePreference;
import com.diary.drawing.domain.user.domain.Member;


@Repository
public interface MemberStylePreferenceRespository  extends JpaRepository<MemberStylePreference, Long>{
    Optional<MemberStylePreference> findByImageStyleAndMember(ImageStyle imageStyle, Member member);

    @Query("SELECT m FROM MemberStylePreference m WHERE m.member = :member AND m.frequency = (SELECT MAX(m2.frequency) FROM MemberStylePreference m2 WHERE m2.member = :member)")
    List<MemberStylePreference> findPreferenceWithMaxFrequency(@Param("member") Member member);

}
