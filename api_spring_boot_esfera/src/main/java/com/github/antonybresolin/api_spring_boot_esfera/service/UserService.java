package com.github.antonybresolin.api_spring_boot_esfera.service;


import com.github.antonybresolin.api_spring_boot_esfera.model.User;
import com.github.antonybresolin.api_spring_boot_esfera.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service

public class UserService {
    @Autowired
    UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public String findNameByUsername(String username) {
        return userRepository.findNameByUsername(username);
    }


}
