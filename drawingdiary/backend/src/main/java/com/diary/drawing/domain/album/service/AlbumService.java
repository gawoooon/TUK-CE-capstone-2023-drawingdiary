package com.diary.drawing.domain.album.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.domain.album.domain.Album;
import com.diary.drawing.domain.album.dto.AlbumAllDTO;
import com.diary.drawing.domain.album.dto.AlbumListDTO;
import com.diary.drawing.domain.album.dto.AlbumRequestDTO;
import com.diary.drawing.domain.album.exception.AlbumExceptionType;
import com.diary.drawing.domain.album.exception.AlbumResponseException;
import com.diary.drawing.domain.album.repository.AlbumRepository;
import com.diary.drawing.domain.diary.domain.Image;
import com.diary.drawing.domain.diary.dto.ImageForAlbumDTO;
import com.diary.drawing.domain.diary.repository.DiaryRepository;
import com.diary.drawing.domain.diary.repository.ImageRepository;
import com.diary.drawing.domain.user.domain.Member;
import com.diary.drawing.domain.user.repository.MemberRepository;
import com.diary.drawing.domain.user.service.ValidateMemberService;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AlbumService {
    
    // 의존성 주입

    private final AlbumRepository albumRepository;
    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;
    private final ValidateMemberService validateMemberService;
    private final ImageRepository imageRepository;

    /* 기본 앨범 찾고, 없으면 새로 만들어서 return */
    @Transactional
    public Album getBasicAlbum(Member member){
        // 기본 앨범 찾기
        Album album = albumRepository.findByAlbumNameAndMember("기본", member);
        // 기본 앨범 없으면 새로 만듬
        if(album == null){
            return addAlbum(new AlbumRequestDTO("기본"), member.getMemberID());
        }
  
        return album;
    }

    /* 이름과 id 매칭되는지 확인 */
    public Album validateAlbumByMember(Long albumID, Member member){
        return albumRepository.findByAlbumIDAndMember(albumID, member)
                    .orElseThrow(() -> new RuntimeException("사용자와 일치하는 앨범이 없습니다"));
    }

    /* 앨범 추가 */
    @Transactional
    @SuppressWarnings("null") // 일단 null값 경고 지웠음
    public Album addAlbum(AlbumRequestDTO albumDTO, Long memberID) throws IOException {

        // id로 멤버찾기
        Member member = validateMemberService.validateMember(memberID);
        Album check = albumRepository.findByAlbumNameAndMember(albumDTO.getAlbumName(), member);
        if(check != null) throw new AlbumResponseException(AlbumExceptionType.ALREADY_EXIST_ALBUMNAME);
        

        // 앨범 생성
        Album album = Album.builder()
            .albumName(albumDTO.getAlbumName())
            .member(member)
            .build();
        return albumRepository.save(album);


    }

    /* 멤버별 앨범 리스트 return, 아무것도 없다면 빈 리스트 반환 */
    public List<AlbumListDTO> getAlbumsByMember(Long memberID) {
        Member member = validateMemberService.validateMember(memberID);
        List<Album> albums = albumRepository.findByMember(member);
            return albums.stream()
                        .map(album -> new AlbumListDTO(album.getAlbumID(), album.getAlbumName()))
                        .collect(Collectors.toList());
    }


    /* 앨범 삭제 */
    @Transactional
    public ResponseEntity<String> deleteAlbum(Long albumID, Long memberID){
        Album album = albumRepository.findByAlbumID(albumID);
        
        // 앨범 못찾으면 예외
        if(album == null){
            throw new AlbumResponseException(AlbumExceptionType.NOT_FOUND_ALBUM);
        }

        // 기본 앨범이면 예외
        Album basicAlbum = getBasicAlbum(album.getMember());
        if(album.equals(basicAlbum)){
            throw new AlbumResponseException(AlbumExceptionType.TRY_DELETE_BASICALBUM);
        }

        // 본인 앨범이 아니라면 예외
        Member member = validateMemberService.validateMember(memberID);
        if(!album.getMember().equals(member)){
            throw new AlbumResponseException(AlbumExceptionType.UNAUTHORIZED_DELETION);
        }

        insertAlbumToAlbum(album, basicAlbum);
        albumRepository.delete(album);
        return ResponseEntity.ok("앨범 삭제가 완료되었습니다.");

    }

    /* 특정 앨범의 내용을 모두 다른 앨범으로 바꿈 */
    @Transactional
    public ResponseEntity<?> insertAlbumToAlbum(Album from, Album to){
        if (from != null && to != null) {
            List<Image> diariesToUpdate = imageRepository.findByAlbum(from);
            for (Image image: diariesToUpdate) {
                image.setAlbum(to);
                imageRepository.save(image);
            }
            return ResponseEntity.ok("앨범 이전이 완료되었습니다.");
        }

        throw new AlbumResponseException(AlbumExceptionType.NOT_FOUND_ALBUM);
    }



    // 앨범에 따른 다이어리 리스트 리턴
    public ResponseEntity<?> getAllOfAlbum(Long memberID) {
        Member member = memberRepository.findByMemberID(memberID)
            .orElseThrow(() -> new AlbumResponseException(AlbumExceptionType.NOT_FOUND_MEMBER));

        List<Album> albums = albumRepository.findByMember(member);
        List<AlbumAllDTO> response =  albums.stream()
            .map(album -> new AlbumAllDTO(album.getAlbumID(), album.getAlbumName(), getImagesOfAlbum(album)))
            .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    // 이미지에서 이미지 추출(경량화했음)
    public List<ImageForAlbumDTO> getImagesOfAlbum(Album album){
        List<Image> images = imageRepository.findByAlbumOrderByDateAsc(album);
        return images.stream()
            .map(image -> new ImageForAlbumDTO(image.getImageID(), image.getImageFile(), image.getDate()))
            .collect(Collectors.toList());

    }
}
