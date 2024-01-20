package com.diary.drawing.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.diary.drawing.user.domain.User;
import com.diary.drawing.user.repository.UserRepository;

import jakarta.annotation.Nonnull;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(@Nonnull User user) {
        return userRepository.save(user);
    }

    
}
