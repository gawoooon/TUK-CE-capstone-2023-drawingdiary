package com.diary.drawing.album.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.album.dto.AlbumListDTO;
import com.diary.drawing.album.dto.AlbumRequestDTO;
import com.diary.drawing.album.exception.AlbumExceptionType;
import com.diary.drawing.album.exception.AlbumResponseException;
import com.diary.drawing.album.repository.AlbumRepository;
import com.diary.drawing.album.service.AlbumService;
import com.diary.drawing.jwt.domain.PrincipalDetails;
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

    /* 앨범 추가
     * @api = "/api/album")
     * @param albumname
     */
    @Operation(summary = "앨범 추가")
    @PostMapping
    public void addAlbum(@Valid @RequestBody AlbumRequestDTO albumDTO, @AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception{

        albumService.addAlbum(albumDTO, principalDetails.getMemberID());
    }

    /* 토큰으로 앨범 삭제 api */
    @Operation(summary = "멤버별 앨범 리스트")
    @DeleteMapping("/{albumID}")
    public ResponseEntity<?> deleteAlbum(@PathVariable Long albumID, @AuthenticationPrincipal PrincipalDetails principalDetails){
        return albumService.deleteAlbum(albumID, principalDetails.getMemberID());
    }

    // 앨범 리스트 넘겨주는 api
    @Operation(summary = "멤버별 앨범 리스트")
    @GetMapping("/list/{memberID}")
    public List<AlbumListDTO> getAlbumList(@PathVariable Long memberID){
        // member 존재한다면
        Optional<Member> m = memberRepository.findByMemberID(memberID);

        if(m.isPresent()){
            return albumService.getAlbumsByMember(m.get());
        } else {
            throw new AlbumResponseException(AlbumExceptionType.NOT_FOUND_MEMBER);
        }
    }

    /* 토큰으로 앨범 페이지 앨범 + 이미지 넘겨주는 api */
    @Operation(summary = "멤버별 앨범 리스트")
    @GetMapping("/all")
    public ResponseEntity<?> getAlbumAll(@AuthenticationPrincipal PrincipalDetails principalDetails){
        return albumService.getAllOfAlbum(principalDetails.getMemberID());
    }
    
}
