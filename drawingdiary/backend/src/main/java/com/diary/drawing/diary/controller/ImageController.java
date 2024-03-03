package com.diary.drawing.diary.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.album.service.ValidateAlbumService;
import com.diary.drawing.diary.domain.Image;
import com.diary.drawing.diary.dto.TestImageServiceDTO;
import com.diary.drawing.diary.dto.TestImageUpdateDTO;
import com.diary.drawing.diary.repository.DiaryRepository;
import com.diary.drawing.diary.repository.PromptRepository;
import com.diary.drawing.diary.service.ImageService;
import com.diary.drawing.diary.service.ValidateImageService;

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
    private final ValidateAlbumService validateAlbumService;
    private final ValidateImageService validateImageService;

    @Operation(summary = "이미지 URL에서 로컬 스토리지 저장 테스트용")
    @PostMapping("/test/save")
    public String testSaveImage(@RequestBody TestImageServiceDTO dto) throws Exception {
        return imageService.testSaveImageFromUrl(dto.getImageFile(), dto.getDate());
    }

    @Operation(summary = "이미지 생성 테스트용")
    @PostMapping("/test/create")
    public String testCreateImage(@RequestBody TestImageServiceDTO dto) throws Exception{

        Album album = validateAlbumService.validateAlbum(dto.getAlbumID());

        imageService.createImage(dto.getImageFile(), album, dto.getDate());
        return " 이미지 생성 성공! 테스트이므로 db 에서 확인하고 지울것 ";
    }


    @Operation(summary = "이미지 수정 테스트용")
    @PostMapping("/test/update")
    public String testUpdateImage(@RequestBody TestImageUpdateDTO dto) throws Exception{

        Album album = validateAlbumService.validateAlbum(dto.getAlbumID());
        Image image = validateImageService.validateImage(dto.getImageID());

        imageService.updateImage(dto.getImageFile(), album, image);
        return " 이미지 수정 성공! 테스트이므로 db 에서 확인하고 지울것 ";
    }



    
}


