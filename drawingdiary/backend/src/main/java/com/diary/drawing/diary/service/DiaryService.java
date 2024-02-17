package com.diary.drawing.diary.service;

import java.util.Optional;

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

import lombok.RequiredArgsConstructor;


//@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class DiaryService {
    /* 임시적으로 생성전 다이어리를 만드는 서비스 */
    
    private final DiaryRepository diaryRepository;
    private final DateRepository dateRepository;
    private final AlbumRepository albumRepository;
    private final MemberRepository memberRepository;
    private final ImageStyleRepository imageStyleRepository;


    /* 임시 다이어리 객체 추가 */
    //TODO: transaction 옆 예외처리 해야됨
    //@Transactional
    public Diary createDiary(DiaryRequestDTO diaryRequestDTO){

        // date album member 찾기
        Date d = dateRepository.findByDateID(diaryRequestDTO.getDateID());
        Album a = albumRepository.findByAlbumID(diaryRequestDTO.getAlbumID());
        Optional<Member> m = memberRepository.findByMemberID(diaryRequestDTO.getMemberID());
        ImageStyle s = imageStyleRepository.findByStyleID(diaryRequestDTO.getStyleID());

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

    /* 다이어리 수정 메소드 */


}
