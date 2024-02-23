package com.diary.drawing.diary.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.domain.Prompt;
import com.diary.drawing.diary.dto.TestImageServiceDTO;
import com.diary.drawing.diary.repository.DiaryRepository;
import com.diary.drawing.diary.repository.PromptRepository;
import com.diary.drawing.diary.service.ImageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Image", description = "테스트용 이미지 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image")
public class ImageController {
    private final ImageService imageService;
    private final DiaryRepository diaryRepository;
    private final PromptRepository promptRepository;

    @Operation(summary = "이미지 생성 테스트용")
    @PostMapping("/test/create")
    public String testCreateImage(@RequestBody TestImageServiceDTO dto) throws Exception{

        Diary d = diaryRepository.findByDiaryID(dto.getDiaryID());
        if(d.equals(null)){
            return "not exist Diary Error";
        }

        Prompt p = promptRepository.findByPromptID(dto.getPromptID());
        if(p.equals(null)){
            return "not exist Prompt Error";
        }

        imageService.createImage(dto.getImageFile(), p);
        return " 이미지 생성 성공! 테스트이므로 db 에서 확인하고 지울것 ";
    }


    @Operation(summary = "이미지 수정 테스트용")
    @PostMapping("/test/update")
    public String testUpdateImage(@RequestBody TestImageServiceDTO dto) throws Exception{

        Diary d = diaryRepository.findByDiaryID(dto.getDiaryID());
        if(d.equals(null)){
            return "not exist Diary Error";
        }

        Prompt p = promptRepository.findByPromptID(dto.getPromptID());
        if(p.equals(null)){
            return "not exist Prompt Error";
        }

        imageService.updateImage(dto.getImageFile(), d, p);
        return " 이미지 수정 성공! 테스트이므로 db 에서 확인하고 지울것 ";
    }



    
}
