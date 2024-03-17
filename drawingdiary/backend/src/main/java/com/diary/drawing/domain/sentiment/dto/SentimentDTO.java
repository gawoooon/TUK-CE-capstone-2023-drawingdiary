package com.diary.drawing.domain.sentiment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SentimentDTO {
    private Document document;

    @Data
    @NoArgsConstructor
    public static class Document {
        @JsonProperty("sentiment")
        private String sentiment;
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

