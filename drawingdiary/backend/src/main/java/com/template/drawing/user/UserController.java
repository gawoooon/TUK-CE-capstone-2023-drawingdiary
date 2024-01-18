package com.diary.drawing.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/users")

public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/findAll")
    public List<User> getAllUsers(){
        return null;

    };

    @GetMapping("/insert")
    public User insert(@RequestBody User user){
        return userService.insertUser(user);

    }
}
    

    




