package com.diary.drawing.album.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.album.dto.AlbumDTO;
import com.diary.drawing.album.exception.AlbumExceptionType;
import com.diary.drawing.album.exception.AlbumResponseException;
import com.diary.drawing.album.repository.AlbumRepository;
import com.diary.drawing.album.service.AlbumService;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.repository.MemberRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Album", description = "Album API")
@RestController
@RequestMapping("/api/album")
public class AlbumController {
    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private AlbumService albumService;

    @Autowired
    private MemberRepository memberRepository;

    // 앨범 추가 api
    @Operation(summary = "앨범 추가")
    @PostMapping("/add")
    public void add (@Valid @RequestBody AlbumDTO albumDTO) throws Exception{
        // 존재하는 멤버인가?
        Optional<Member> m = memberRepository.findByMemberID(albumDTO.getMemberID());
        if(!(m.isPresent())){
            throw new AlbumResponseException(AlbumExceptionType.NOT_FOUND_MEMBER);
        }

        // 어떤 사용자가 이미 가진 앨범명
        if(albumRepository.existsByMemberAndAlbumName(m.get(), albumDTO.getAlbumName())){
            throw new AlbumResponseException(AlbumExceptionType.ALREADY_EXIST_ALBUMNAME);
        }
        
        albumService.addAlbum(albumDTO);
    }

    // 앨범 리스트 넘겨주는 api
    @Operation(summary = "멤버별 앨범 리스트")
    @GetMapping("/list")
    public List<Album> getAlbumList(@RequestBody Long memberID){
        // member 존재한다면
        Optional<Member> m = memberRepository.findByMemberID(memberID);

        if(m.isPresent()){
            return albumService.getAlbumsByMember(m.get());
        } else {
            throw new AlbumResponseException(AlbumExceptionType.NOT_FOUND_MEMBER);
        }
    }
    
}
