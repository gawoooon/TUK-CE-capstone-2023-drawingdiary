package com.diary.drawing.diary.controller;
import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.dto.CalenderDTO;
import com.diary.drawing.diary.dto.DiaryRequestDTO;
import com.diary.drawing.diary.dto.DiaryResponseDTO;
import com.diary.drawing.diary.dto.FinalDiaryRequestDTO;
import com.diary.drawing.diary.service.DiaryService;
import com.diary.drawing.diary.service.GenerateDiaryService;
import com.diary.drawing.jwt.domain.PrincipalDetails;

import io.jsonwebtoken.io.IOException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Diary", description = "Diary API")
@RequiredArgsConstructor
@RestController
public class DiaryController {

    private final DiaryService diaryService;
    private final GenerateDiaryService generateDiaryService;

    /* 일기를 생성하는 api [POST]
     *
     * @Header AT
     * diary/dto/FinalDiaryRequestDTO.java
     */

    @Operation(summary = "최종 일기 생성")
    @PostMapping("api/diary/add")
    public ResponseEntity<?> addDiary(@RequestBody FinalDiaryRequestDTO finalDiaryRequestDTO, @AuthenticationPrincipal PrincipalDetails principalDetails) throws IOException, FileNotFoundException, java.io.IOException{
        return generateDiaryService.generateDiary(finalDiaryRequestDTO, principalDetails.getMemberID());
    }

    /* 최종 일기 수정 api
     * 
     * 
     */
    @Operation(summary = "최종 일기 수정")
    @PutMapping("api/diary/{date}")
    public ResponseEntity<?> updateDiary(@RequestBody FinalDiaryRequestDTO finalDiaryRequestDTO, @AuthenticationPrincipal PrincipalDetails principalDetails) throws IOException, FileNotFoundException, java.io.IOException{
        return generateDiaryService.updateDiary(finalDiaryRequestDTO, principalDetails.getMemberID());
    }

    /* 최종 일기 삭제
     * 
     * 
     */
    @Operation(summary = "최종 일기 삭제")
    @DeleteMapping("api/diary/{date}")
    public ResponseEntity<?> deleteDiary(@PathVariable LocalDate date, @AuthenticationPrincipal PrincipalDetails principalDetails){
        return diaryService.delete(date, principalDetails.getMemberID());
    }

    /* 일기 세부사항을 조회하는 api [GET]
     *
     * @Header AccessToken
     * @param date(yyyy-MM-dd 형식)
     */
    @Operation(summary = "특정 날짜 일기 자세히 조회")
    @GetMapping("/api/diary/{date}")
    public ResponseEntity<?> getDiary(@PathVariable LocalDate date, @AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception{
        DiaryResponseDTO responseDTO = diaryService.getDiary(date, principalDetails.getMemberID());
        return ResponseEntity.ok().body(responseDTO);
    }

    /* 캘린더용 한달 미리보기 (이미지, 텍스트 내용) 제공하는 API [GET]
     * 
     * @param yyyy-MM 형식
     */

    @Operation(summary = "캘린더용 한달 미리보기 리스트 반환")
    @GetMapping("/api/calender/{year}-{month}")
    public List<CalenderDTO> getCalender(@PathVariable int year, @PathVariable int month, @AuthenticationPrincipal PrincipalDetails principalDetails){
        return diaryService.calender(year, month, principalDetails.getMemberID());
    }


    @Operation(summary = "테스트 - 추가")
    @PostMapping("/api/diary/test/add")
    public Diary testAddDiary(@RequestBody DiaryRequestDTO diaryRequestDTO) throws Exception{
        return diaryService.testcreateDiary(diaryRequestDTO);
    }

    @Operation(summary = "테스트 - 수정")
    @PutMapping("/api/diary/test/update/{id}")
    public ResponseEntity<Void> testupdateDiary(@RequestBody DiaryRequestDTO diaryRequestDTO, @PathVariable Long id){
        diaryService.updateDiary(diaryRequestDTO, id);
        return ResponseEntity.noContent().build();
    }

}
