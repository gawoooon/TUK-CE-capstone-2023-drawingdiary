package com.diary.drawing.album.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.album.domain.Album;


//TODO: 이거 완성하기
@Repository
public interface AlbumRepository extends JpaRepository<Album, Long>{
    // 오류남
    // @Query("SELECT a FROM Album a WHERE a.memberID in = :searchMember")
    // public List<Album> findByMemberIDAlbums(@Param("searchMember") Long memberID);
}