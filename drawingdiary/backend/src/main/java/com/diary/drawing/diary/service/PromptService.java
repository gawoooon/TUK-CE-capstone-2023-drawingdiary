package com.diary.drawing.diary.service;

import org.springframework.stereotype.Service;

import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.domain.Prompt;
import com.diary.drawing.diary.repository.PromptRepository;
import com.diary.drawing.sentiment.domain.Sentiment;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PromptService {
    private final PromptRepository promptRepository;

    /* 프롬프트 생성해서 넘겨주는 메소드 */
    public Prompt generatePrompt(Diary diary, Sentiment sentiment){

        // TODO: 다이어리 이용해서 프롬프트 텍스트 만들어주기~~ 임시로 "temp" 넣었음
        String text = "생성된 프롬프트 내용";

        Prompt prompt = Prompt.builder()
            .promptText(text)
            .diary(diary)
            .sentiment(sentiment)
            .build();
        return promptRepository.save(prompt);
    }

    
}