package com.diary.drawing.diary.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.diary.domain.Date;

@Repository
public interface DateRepository extends JpaRepository<Date, Long>{
    Date findByDateID(Long dateID); // Optional: findBy로 조회했을 때 객체가 존재하지 않는 경우 처리
}
