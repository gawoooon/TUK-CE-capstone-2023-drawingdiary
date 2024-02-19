package com.diary.drawing.album.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.album.dto.AlbumDTO;
import com.diary.drawing.album.repository.AlbumRepository;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.repository.MemberRepository;

import io.jsonwebtoken.io.IOException;

//@RequiredArgsConstructor
@Service
public class AlbumService {
    
    // 의존성 주입
    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private MemberRepository memberRepository;

    /* 앨범 추가 */
    @SuppressWarnings("null") // 일단 null값 경고 지웠음
    public Album addAlbum(AlbumDTO albumDTO) throws IOException {

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
    public List<Album> getAlbumsByMember(Member member) {
        return albumRepository.findByMember(member);
    }

    // 앨범 삭제
}
