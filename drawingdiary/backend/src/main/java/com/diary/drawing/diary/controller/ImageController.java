package com.diary.drawing.diary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.diary.service.ImageService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Image", description = "테스트용 이미지 API")
@RestController
@RequestMapping("/api/image")
public class ImageController {
    @Autowired
    private ImageService imageService;

    
}
