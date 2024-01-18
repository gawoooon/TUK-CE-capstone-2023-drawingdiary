package com.diary.drawing.user;

import java.util.List;

public interface UserService {
    public User insertUser(User user);

    List<User> getUsers();

}
