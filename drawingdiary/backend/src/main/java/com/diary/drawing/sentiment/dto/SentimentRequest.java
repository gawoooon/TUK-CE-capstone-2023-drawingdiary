package com.diary.drawing.sentiment.dto;

public class SentimentRequest {
    private String content;
    // content 필드에 대한 getter 메소드
    public String getContent() {
        return content;
    }

    // content 필드에 대한 setter 메소드 (필요한 경우)
    public void setContent(String content) {
        this.content = content;
    }
}