package com.diary.drawing.album.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.album.exception.AlbumExceptionType;
import com.diary.drawing.album.exception.AlbumResponseException;
import com.diary.drawing.album.repository.AlbumRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ValidateAlbumService {

    private final AlbumRepository albumRepository;

    public Album validateAlbum(Long albumID){
        Album album = albumRepository.findByAlbumID(albumID);
        if(album == null){ throw new AlbumResponseException(AlbumExceptionType.NOT_FOUND_ALBUM);}
        else return album;
    }
    

    
}
