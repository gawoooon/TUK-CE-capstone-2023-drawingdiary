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

    public Diary addDiary(DiaryRequestDTO diaryRequestDTO){

        // date album member 찾기
        Date d = dateRepository.findByDateID(diaryRequestDTO.getDateID());
        Album a = albumRepository.findByAlbumID(diaryRequestDTO.getAlbumID());
        Optional<Member> m = memberRepository.findByMemberID(diaryRequestDTO.getMemberID());

        
        //TODO: 예외처리 해야됨
        Diary diary = Diary.builder()
            .text(diaryRequestDTO.getText())
            .weather(diaryRequestDTO.getWeather())
            .date(d)
            .album(a)
            .member(m.get())
            .build();
            return diaryRepository.save(diary);
    }

    // TODO: 1. 감정이랑 코멘트 2 프롬프트 3 이미지 각각 추가하는 코드
}
