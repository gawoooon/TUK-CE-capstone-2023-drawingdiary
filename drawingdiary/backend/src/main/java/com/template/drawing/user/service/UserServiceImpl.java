<<<<<<<< HEAD:drawingdiary/backend/src/main/java/com/template/drawing/user/service/UserServiceImpl.java
package com.template.drawing.user.service;
========
package com.diary.drawing.user;

import java.util.List;
>>>>>>>> ebf0b6e16ec2d3a5096dd7e86026c8ecca279203:drawingdiary/backend/src/main/java/com/template/drawing/user/UserServiceImpl.java

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

<<<<<<<< HEAD:drawingdiary/backend/src/main/java/com/template/drawing/user/service/UserServiceImpl.java
import com.template.drawing.user.domain.User;
import com.template.drawing.user.repository.UserRepository;

import jakarta.annotation.Nonnull;

========
>>>>>>>> ebf0b6e16ec2d3a5096dd7e86026c8ecca279203:drawingdiary/backend/src/main/java/com/template/drawing/user/UserServiceImpl.java

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
