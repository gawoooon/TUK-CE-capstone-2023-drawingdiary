package com.diary.drawing.diary.controller;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.diary.domain.Diary;
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
@RequestMapping("/api")
public class DiaryController {
    @Autowired
    private DiaryService diaryService;

    @Operation(summary = "일기 작성하지 않은 날짜에 일기 생성 후 ID 리턴")
    @PostMapping("/diary/add")
    public ResponseEntity<CreateDiaryResponseDTO> addDiary(@RequestBody CreateDiaryRequestDTO createDiaryRequestDTO) throws Exception{
        Long diaryID = diaryService.createTemporaryDiary(createDiaryRequestDTO);
        return ResponseEntity.ok().body(new CreateDiaryResponseDTO(diaryID));
    }

    // 나중에 token으로 인증 추가
    @Operation(summary = "일기 조회")
    @GetMapping("/diary/{date}")
    public ResponseEntity<?> addDiary(@PathVariable LocalDate date, @AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception{
        DiaryResponseDTO responseDTO = diaryService.getDiary(date, principalDetails.getMemberID());
        return ResponseEntity.ok().body(responseDTO);
    }


    @Operation(summary = "작성 일기 형식 잘 들어가는지 확인")
    @PostMapping("/diary/test/add")
    public Diary AddDiary(@RequestBody DiaryRequestDTO diaryRequestDTO) throws Exception{
        return diaryService.testcreateDiary(diaryRequestDTO);
    }

    //@PutMapping("/test/update/{id}")
    //public Diary testupdateDiary(@RequestBody DiaryRequestDTO diaryRequestDTO, @PathVariable long id)
    @Operation(summary = "작성 일기 형식 수정 확인")
    @PutMapping("/diary/test/update/{id}")
    public ResponseEntity<Void> testupdateDiary(@RequestBody DiaryRequestDTO diaryRequestDTO, @PathVariable Long id){
        diaryService.updateDiary(diaryRequestDTO, id);
        return ResponseEntity.noContent().build();
    }

    


}
