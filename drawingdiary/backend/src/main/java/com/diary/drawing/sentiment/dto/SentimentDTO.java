package com.diary.drawing.sentiment.dto;

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

