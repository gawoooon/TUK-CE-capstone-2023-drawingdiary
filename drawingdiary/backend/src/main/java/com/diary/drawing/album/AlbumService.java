package com.diary.drawing.album;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    // 앨범 추가
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

    // 앨범 추가

    // 앨범 삭제
}
