package com.diary.drawing.album.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.user.domain.Member;


//TODO: 이거 완성하기
@Repository
public interface AlbumRepository extends JpaRepository<Album, Long>{

    // 같은 사용자의 같은이름 앨범 존재하는지 확인
    boolean existsByMemberAndAlbumName(Member member, String albumName);

    // 어떤 사용자의 앨범 리스트 조회
    List<Album> findByMember(Member member);

    // albumID로 앨범 조회
    Album findByAlbumID(Long albumID);

    // 기본 앨범 조회
    Album findByAlbumNameAndMember(String albumName, Member member);

    // id와 멤버로 존재유무 확인
    Optional<Album> findByAlbumIDAndMember(Long memberID, Member member);

    
}
