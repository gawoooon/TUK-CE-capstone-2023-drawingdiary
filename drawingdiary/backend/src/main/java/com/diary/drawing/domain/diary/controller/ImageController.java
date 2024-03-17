package com.diary.drawing.domain.diary.controller;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.domain.album.domain.Album;
import com.diary.drawing.domain.album.service.ValidateAlbumService;
import com.diary.drawing.domain.diary.dto.TestImageServiceDTO;
import com.diary.drawing.domain.diary.dto.TestImageUpdateDTO;
import com.diary.drawing.domain.diary.service.ImageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Image", description = "테스트용 이미지 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image")
public class ImageController {
    private final ImageService imageService;
    private final ValidateAlbumService validateAlbumService;

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

        imageService.updateImage(dto.getImageFile(), album, dto.getImageID());
        return " 이미지 수정 성공! 테스트이므로 db 에서 확인하고 지울것 ";
    }

    
    @Operation(summary = "이미지 URL에서 s3 저장 테스트용")
    @PostMapping("/test/save")
    public String testSaveImage(@RequestParam String imageUrl, @RequestParam LocalDate date) throws Exception {
        return imageService.testSaveImageFromUrl(imageUrl, date);
    }



    
}


