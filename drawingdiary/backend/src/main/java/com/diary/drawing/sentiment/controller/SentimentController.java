package com.diary.drawing.sentiment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.sentiment.dto.SentimentDTO;
import com.diary.drawing.sentiment.dto.SentimentRequest;
import com.diary.drawing.sentiment.service.SentimentService;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;

@Tag(name = "Sentiment", description = "Sentiment API")
@RestController
public class SentimentController {

    @Autowired
    private SentimentService sentimentService;

    @PostMapping("/api/sentiment")
    public ResponseEntity<?> analyzeSentiment(@RequestBody SentimentRequest request) {
        SentimentDTO result = sentimentService.analyzeSentiment(request.getContent());
        return ResponseEntity.ok(result);
    }
}
