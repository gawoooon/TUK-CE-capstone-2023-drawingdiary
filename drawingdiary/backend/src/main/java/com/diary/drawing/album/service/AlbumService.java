package com.diary.drawing.album.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.album.dto.AlbumAllDTO;
import com.diary.drawing.album.dto.AlbumListDTO;
import com.diary.drawing.album.dto.AlbumRequestDTO;
import com.diary.drawing.album.exception.AlbumExceptionType;
import com.diary.drawing.album.exception.AlbumResponseException;
import com.diary.drawing.album.repository.AlbumRepository;
import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.dto.ImageForAlbumDTO;
import com.diary.drawing.diary.repository.DiaryRepository;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.repository.MemberRepository;

import io.jsonwebtoken.io.IOException;

//@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AlbumService {
    
    // 의존성 주입
    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private DiaryRepository diaryRepository;

    /* 기본 앨범 찾고, 없으면 새로 만들어서 return */
    public Album getBasicAlbum(Long albumID, Member member){
        // 기본 앨범 찾기
        Album album = albumRepository.findByAlbumNameAndMember("기본", member);
        // 기본 앨범 없으면 새로 만듬
        if(album == null){
            return addAlbum(new AlbumRequestDTO("기본", member.getMemberID()));
        }
        return album;
    }

    /* 이름과 id 매칭되는지 확인 */
    public Album validateAlbumByMember(Long albumID, Member member){
        return albumRepository.findByAlbumIDAndMember(albumID, member)
                    .orElseThrow(() -> new RuntimeException("사용자와 일치하는 앨범이 없습니다"));
    }

    /* 앨범 추가 */
    @SuppressWarnings("null") // 일단 null값 경고 지웠음
    public Album addAlbum(AlbumRequestDTO albumDTO) throws IOException {

        // id로 멤버찾기
        Optional<Member> m = memberRepository.findByMemberID(albumDTO.getMemberID());
    
        if(m.isPresent()){
            // 앨범 생성
            Album album = Album.builder()
                .albumName(albumDTO.getAlbumName())
                .member(m.get())
                .build();
            return albumRepository.save(album);
        }
        else {
            throw new RuntimeException("Member with id " + albumDTO.getMemberID() + " not found");
        }

    }

    /* 멤버별 앨범 리스트 return, 아무것도 없다면 빈 리스트 반환 */
    public List<AlbumListDTO> getAlbumsByMember(Member member) {
        List<Album> albums = albumRepository.findByMember(member);
            return albums.stream()
                        .map(album -> new AlbumListDTO(album.getAlbumID(), album.getAlbumName()))
                        .collect(Collectors.toList());
    }


    /* 앨범 삭제 */
    public ResponseEntity<String> deleteAlbum(Long albumID){
        Album album = albumRepository.findByAlbumID(albumID);
        
        // 앨범 못찾으면 예외
        if(album == null){
            throw new AlbumResponseException(AlbumExceptionType.NOT_FOUND_ALBUM);
        }

        // 기본 앨범이면 예외
        Album basicAlbum = getBasicAlbum(albumID, album.getMember());
        if(album.equals(basicAlbum)){
            throw new AlbumResponseException(AlbumExceptionType.TRY_DELETE_BASICALBUM);
        }

        insertAlbumToAlbum(album, basicAlbum);
        albumRepository.delete(album);
        return ResponseEntity.ok("앨범 삭제가 완료되었습니다.");

    }

    /* 특정 앨범의 내용을 모두 다른 앨범으로 바꿈 */
    @Transactional
    public ResponseEntity<?> insertAlbumToAlbum(Album from, Album to){
        if (from != null && to != null) {
            List<Diary> diariesToUpdate = diaryRepository.findByAlbum(from);
            for (Diary diary : diariesToUpdate) {
                diary.setAlbum(to);
                diaryRepository.save(diary);
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

    // 다이어리에서 이미지 추출
    public List<ImageForAlbumDTO> getImagesOfAlbum(Album album){
        List<Diary> diaries = diaryRepository.findByAlbum(album);
        return diaries.stream()
            .filter(diary -> diary != null && diary.getImage() != null)
            .map(diary -> new ImageForAlbumDTO(diary.getImage().getImageID(), diary.getImage().getImageFile(), diary.getDate(), diary.getDiaryID()))
            .collect(Collectors.toList());
    }

}
