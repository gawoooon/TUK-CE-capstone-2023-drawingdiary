package com.diary.drawing.sentiment.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SentimentDTO {
    private Document document;

    @Data
    @NoArgsConstructor
    public static class Document {
        private Confidence confidence;
    }

    @Data
    @NoArgsConstructor
    public static class Confidence {
        private double positive;
        private double negative;
        private double neutral;
    }
}

