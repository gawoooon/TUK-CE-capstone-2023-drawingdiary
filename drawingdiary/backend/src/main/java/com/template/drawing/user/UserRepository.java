<<<<<<<< HEAD:drawingdiary/backend/src/main/java/com/template/drawing/user/repository/UserRepository.java
package com.template.drawing.user.repository;
========
package com.diary.drawing.user;

>>>>>>>> ebf0b6e16ec2d3a5096dd7e86026c8ecca279203:drawingdiary/backend/src/main/java/com/template/drawing/user/UserRepository.java

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

<<<<<<<< HEAD:drawingdiary/backend/src/main/java/com/template/drawing/user/repository/UserRepository.java
import com.template.drawing.user.domain.User;


========
>>>>>>>> ebf0b6e16ec2d3a5096dd7e86026c8ecca279203:drawingdiary/backend/src/main/java/com/template/drawing/user/UserRepository.java
@Repository
public interface UserRepository extends JpaRepository<User, Long>{
}