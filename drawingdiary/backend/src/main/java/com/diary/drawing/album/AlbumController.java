package com.diary.drawing.album;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Album", description = "Album API")
@RestController
@RequestMapping("/api/album")
public class AlbumController {
    // @Autowired
    // private AlbumRepository albumRepository;

    @Autowired
    private AlbumService albumService;

    // 앨범 추가 api
    @Operation(summary = "앨범 추가")
    @PostMapping("/add")
    public void add (@Valid @RequestBody AlbumDTO albumDTO) throws Exception{
        /* 어떤 사용자가 이미 가진 앨범명
         *  if(albumReporitory.existsByAlbumName(albumDTO.getMemberID, albumDTO.getAlbumName())){
         *  throw new AlbumResponseException(AlbumExceptionType.ALREADY);
         * }
         */
        
        albumService.addAlbum(albumDTO);
    }
    
}
