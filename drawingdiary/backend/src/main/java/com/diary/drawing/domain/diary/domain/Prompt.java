// package com.diary.drawing.domain.diary.domain;

// import com.diary.drawing.global.common.BaseTime;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;
// import lombok.AccessLevel;
// import lombok.Builder;
// import lombok.Getter;
// import lombok.NoArgsConstructor;

// @Entity
// @Getter
// @NoArgsConstructor(access = AccessLevel.PROTECTED)
// @Table(name = "Prompt")
// public class Prompt extends BaseTime{
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long promptID;

//     @Column(length = 1000)
//     private String promptText;

//     @ManyToOne(fetch = FetchType.LAZY)  // 여러개의 프롬프트 하나의 다이어리
//     @JoinColumn(name = "diaryID") // 외부키 references from diaryID
//     private Diary diary;

//     private String sentiment;

//     @Builder
//     public Prompt(String promptText, Diary diary, String sentiment){
//         this.promptText = promptText;
//         this.diary = diary;
//         this.sentiment=sentiment;
//     }

// }
