package com.github.antonybresolin.api_spring_boot_esfera.controller;

import com.github.antonybresolin.api_spring_boot_esfera.model.User;
import com.github.antonybresolin.api_spring_boot_esfera.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/{username}/{password}")
    public ResponseEntity<?> login(@PathVariable String username, @PathVariable String password) {
        User user = userService.findByUsernameAndPassword(username, password);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{username}")
    public String findNameByUsername(@PathVariable String username) {
        return userService.findNameByUsername(username);
    }
}
