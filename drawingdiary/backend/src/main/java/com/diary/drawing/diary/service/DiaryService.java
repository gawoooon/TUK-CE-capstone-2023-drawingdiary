package com.diary.drawing.diary.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.album.repository.AlbumRepository;
import com.diary.drawing.diary.domain.Date;
import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.dto.DiaryRequestDTO;
import com.diary.drawing.diary.repository.DateRepository;
import com.diary.drawing.diary.repository.DiaryRepository;
import com.diary.drawing.imagestyle.domain.ImageStyle;
import com.diary.drawing.imagestyle.repository.ImageStyleRepository;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.repository.MemberRepository;

@Service
public class DiaryService {
    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private DateRepository dateRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ImageStyleRepository imageStyleRepository;


    /* 다이어리 객체 추가 */
    //TODO: 예외처리 해야됨
    public Diary addDiary(DiaryRequestDTO diaryRequestDTO){

        // date album member 찾기
        Date d = dateRepository.findByDateID(diaryRequestDTO.getDateID());
        Album a = albumRepository.findByAlbumID(diaryRequestDTO.getAlbumID());
        Optional<Member> m = memberRepository.findByMemberID(diaryRequestDTO.getMemberID());
        ImageStyle s = imageStyleRepository.findByImageStyleID(diaryRequestDTO.getImageStyleID());

        Diary diary = Diary.builder()
            .text(diaryRequestDTO.getText())
            .weather(diaryRequestDTO.getWeather())
            .date(d)
            .album(a)
            .member(m.get())
            .imageStyle(s)
            .build();
            return diaryRepository.save(diary);
    }

    /* 이후 각각 새로고침 가능하게 하기 위해 image, sentiment, comment 별개 구현 */
    /* 이미지 저장 */
    // TODO: 예외처리 해야함


}
