package com.diary.drawing.domain.imagestyle.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.domain.imagestyle.domain.ImageStyle;
import com.diary.drawing.domain.imagestyle.domain.MemberStylePreference;
import com.diary.drawing.domain.user.domain.Member;


@Repository
public interface MemberStylePreferenceRespository  extends JpaRepository<MemberStylePreference, Long>{
    Optional<MemberStylePreference> findByImageStyleAndMember(ImageStyle imageStyle, Member member);
}
