package com.template.drawing.user;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.template.drawing.user.repository.UserRepository;

import jakarta.annotation.Nonnull;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User insertUser(User user) {
        return userRepository.save(user);
    }
    
    @Override
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    
}
