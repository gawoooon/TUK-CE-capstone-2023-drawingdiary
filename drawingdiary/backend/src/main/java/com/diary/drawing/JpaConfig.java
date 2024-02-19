package com.diary.drawing;

import javax.sql.DataSource;
import java.util.Map;
import java.util.HashMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

@Configuration
public class JpaConfig {

    @SuppressWarnings("null")
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan(new String[] { "com.diary.drawing" }); // 패키지명 확인 필요

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        Map<String, Object> properties = new HashMap<>(); // 변경된 부분
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect"); // 사용하는 데이터베이스에 맞게 변경
        em.setJpaPropertyMap(properties);
        return em;
    }
}
