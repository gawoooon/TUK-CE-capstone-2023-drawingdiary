package com.diary.drawing.album.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.album.repository.AlbumRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ValidateAlbumService {

    private final AlbumRepository albumRepository;
    

    
}
