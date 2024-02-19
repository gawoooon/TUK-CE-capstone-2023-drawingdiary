package com.diary.drawing.diary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.dto.DiaryRequestDTO;
import com.diary.drawing.diary.service.DiaryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Diary", description = "Diary API")
@RestController
@RequestMapping("/api/diary")
public class DiaryController {
    @Autowired
    private DiaryService diaryService;

    @Operation(summary = "작성 일기 형식 잘 들어가는지 확인")
    @PostMapping("/test/add")
    public Diary AddDiary(@RequestBody DiaryRequestDTO diaryRequestDTO) throws Exception{
        return diaryService.testcreateDiary(diaryRequestDTO);
    }

    //@PutMapping("/test/update/{id}")
    //public Diary testupdateDiary(@RequestBody DiaryRequestDTO diaryRequestDTO, @PathVariable long id)
    @Operation(summary = "작성 일기 형식 수정 확인")
    @PutMapping("/test/update/{id}")
    public ResponseEntity<Void> testupdateDiary(@RequestBody DiaryRequestDTO diaryRequestDTO, @PathVariable Long id){
        diaryService.updateDiary(diaryRequestDTO, id);
        return ResponseEntity.noContent().build();
    }


}
