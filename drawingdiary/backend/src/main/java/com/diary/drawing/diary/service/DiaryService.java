package com.diary.drawing.diary.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.album.repository.AlbumRepository;
import com.diary.drawing.diary.domain.Date;
import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.dto.CreateDiaryRequestDTO;
import com.diary.drawing.diary.dto.DiaryRequestDTO;
import com.diary.drawing.diary.dto.DiaryResponseDTO;
import com.diary.drawing.diary.repository.DateRepository;
import com.diary.drawing.diary.repository.DiaryRepository;
import com.diary.drawing.imagestyle.domain.ImageStyle;
import com.diary.drawing.imagestyle.repository.ImageStyleRepository;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;



@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class DiaryService {
    /* 임시적으로 생성전 다이어리를 만드는 서비스 */
    
    private final DiaryRepository diaryRepository;
    private final DateRepository dateRepository;
    private final AlbumRepository albumRepository;
    private final MemberRepository memberRepository;
    private final ImageStyleRepository imageStyleRepository;


    /* 첫 생성시 임시 다이어리 객체 추가 */

    @Transactional
    public Long createTemporaryDiary(CreateDiaryRequestDTO requestDTO) throws Exception{
        // 임시 다이어리 객체 생성
        // TODO: token에서 memberid, 프런트에서 date
        Date date = dateRepository.findByDateID(requestDTO.getDateID());
        Optional<Member> m = memberRepository.findByMemberID(requestDTO.getMemberID());

        // 기본 앨범 찾기
        Album album = albumRepository.findByAlbumNameAndMember("기본", m.get());

        Diary temporaryDiary = Diary.builder()
                .date(date)
                .album(album)
                .member( m.get())
                .weather("clearsky")
                .build();

        // 저장하여 ID 반환
        return diaryRepository.save(temporaryDiary).getDiaryID();
    }

    /* 다이어리 내용 세부 조회 */
    public DiaryResponseDTO getDiary(Long diaryID) throws Exception{
        Diary diary = diaryRepository.findByDiaryID(diaryID);
        DiaryResponseDTO diaryResponseDTO = DiaryResponseDTO.from(diary);
        return diaryResponseDTO;
    }



    /* 다이어리 수정 메소드 */
    @Transactional
    public Diary updateDiary(DiaryRequestDTO diaryRequestDTO, Long diaryID){

        // 다이어리 객체 찾기
        Diary oldDiary = diaryRepository.findByDiaryID(diaryID);

        // date album member 찾기
        //TODO: 존재확인 validation 함수 추가로 예외처리
        Album a = albumRepository.findByAlbumID(diaryRequestDTO.getAlbumID());
        ImageStyle s = imageStyleRepository.findByStyleID(diaryRequestDTO.getStyleID());

        return diaryRepository.save(oldDiary.update(diaryRequestDTO, a, s));
    }


    /* 전체 다이어리 추가 테스트용 api */
    @Transactional
    public Diary testcreateDiary(DiaryRequestDTO diaryRequestDTO){

        // date album member 찾기
        //TODO: 존재확인 validation 함수 추가로 예외처리
        Date date = dateRepository.findByDateID(diaryRequestDTO.getDateID());
        Album album = albumRepository.findByAlbumID(diaryRequestDTO.getAlbumID());
        Optional<Member> member = memberRepository.findByMemberID(diaryRequestDTO.getMemberID());
        ImageStyle style = imageStyleRepository.findByStyleID(diaryRequestDTO.getStyleID());


        Diary diary = Diary.builder()
            .text(diaryRequestDTO.getText())
            .weather(diaryRequestDTO.getWeather())
            .date(date)
            .album(album)
            .member(member.get())
            .imageStyle(style)
            .build();
        return diaryRepository.save(diary);
    }

}
