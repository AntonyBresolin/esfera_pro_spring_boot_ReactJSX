package com.github.antonybresolin.api_spring_boot_esfera.repositories;


import com.github.antonybresolin.api_spring_boot_esfera.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsernameAndPassword(String username, String password);

    @Query("SELECT u.name FROM User u WHERE u.username = ?1")
    String findNameByUsername(String username);
}
