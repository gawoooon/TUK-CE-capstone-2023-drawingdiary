package com.diary.drawing.diary.controller;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.dto.CalenderDTO;
import com.diary.drawing.diary.dto.CreateDiaryRequestDTO;
import com.diary.drawing.diary.dto.CreateDiaryResponseDTO;
import com.diary.drawing.diary.dto.DiaryRequestDTO;
import com.diary.drawing.diary.dto.DiaryResponseDTO;
import com.diary.drawing.diary.service.DiaryService;
import com.diary.drawing.jwt.domain.PrincipalDetails;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Diary", description = "Diary API")
@RestController
public class DiaryController {
    @Autowired
    private DiaryService diaryService;

    /* 삭제 예정 */
    @Operation(summary = "일기 작성하지 않은 날짜에 일기 생성 후 ID 리턴")
    @PostMapping("/api/diary/add")
    public ResponseEntity<CreateDiaryResponseDTO> addDiary(@RequestBody CreateDiaryRequestDTO createDiaryRequestDTO) throws Exception{
        Long diaryID = diaryService.createTemporaryDiary(createDiaryRequestDTO);
        return ResponseEntity.ok().body(new CreateDiaryResponseDTO(diaryID));
    }

    /* 일기 세부사항을 조회하는 api
     *
     * @Header AccessToken
     * @param date(yyyy-MM-dd 형식)
     */
    @Operation(summary = "일기 조회")
    @GetMapping("/api/diary/{date}")
    public ResponseEntity<?> addDiary(@PathVariable LocalDate date, @AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception{
        DiaryResponseDTO responseDTO = diaryService.getDiary(date, principalDetails.getMemberID());
        return ResponseEntity.ok().body(responseDTO);
    }


    @Operation(summary = "작성 일기 형식 잘 들어가는지 확인")
    @PostMapping("/api/diary/test/add")
    public Diary AddDiary(@RequestBody DiaryRequestDTO diaryRequestDTO) throws Exception{
        return diaryService.testcreateDiary(diaryRequestDTO);
    }

    //@PutMapping("/test/update/{id}")
    //public Diary testupdateDiary(@RequestBody DiaryRequestDTO diaryRequestDTO, @PathVariable long id)
    @Operation(summary = "작성 일기 형식 수정 확인")
    @PutMapping("/api/diary/test/update/{id}")
    public ResponseEntity<Void> testupdateDiary(@RequestBody DiaryRequestDTO diaryRequestDTO, @PathVariable Long id){
        diaryService.updateDiary(diaryRequestDTO, id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "캘린더용 한달 일기")
    @GetMapping("/api/calender/{year}-{month}")
    public List<CalenderDTO> testupdateDiary(@PathVariable int year, @PathVariable int month, @AuthenticationPrincipal PrincipalDetails principalDetails){
        return diaryService.calender(year, month, principalDetails.getMemberID());
    }
}
