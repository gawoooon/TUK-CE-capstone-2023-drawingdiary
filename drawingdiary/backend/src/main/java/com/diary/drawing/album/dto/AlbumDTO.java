package com.diary.drawing.album.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class AlbumDTO {
    
    @Valid

    @Size(min=1, max=50, message = "앨범 이름은 1에서 50자 사이로 입력해주세요.")
    @NotEmpty(message = "앨범 이름을 비울 수 없습니다.")
    private String albumName;

    @NotNull(message = "고객 ID가 전송되지 않았습니다.")
    private Long memberID;

}