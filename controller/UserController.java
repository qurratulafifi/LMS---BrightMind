
package com.GroupProject.BrightMind.controller;

import com.GroupProject.BrightMind.model.User;
import com.GroupProject.BrightMind.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:63342")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //Register method
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerUser(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam("profile_pic") MultipartFile profilePic) {

        try {
            String filename = System.currentTimeMillis() + "_" + profilePic.getOriginalFilename();
            Path path = Paths.get("uploads", filename);
            Files.createDirectories(path.getParent());
            Files.write(path, profilePic.getBytes());

            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword(password);
            user.setProfile_pic(filename);

            userRepository.save(user);
            return ResponseEntity.ok("User registered");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file");
        }
    }

    // Login method
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam String email, @RequestParam String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            if (user.get().getPassword().equals(password)) {
                return ResponseEntity.ok(user.get());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong password");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    @PostMapping(value = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateUser(
            @RequestParam String original_email,
            @RequestParam String name,
            @RequestParam String new_email,
            @RequestParam String new_pass,
            @RequestParam(value = "profile_pic", required = false) MultipartFile profilePic) {
        System.out.println("📩 original_email: " + original_email);
        System.out.println("📝 name: " + name);
        System.out.println("📧 new_email: " + new_email);
        System.out.println("🔒 new_pass: " + new_pass);


        System.out.println("✅ Received update request for: " + original_email);

        Optional<User> optionalUser = userRepository.findByEmail(original_email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = optionalUser.get();
        user.setName(name);
        user.setPassword(new_pass); // For real apps, hash this!
        user.setEmail(new_email);

        if (profilePic != null && !profilePic.isEmpty()) {
            try {
                String filename = System.currentTimeMillis() + "_" + profilePic.getOriginalFilename();
                Path path = Paths.get("uploads", filename);
                Files.createDirectories(path.getParent());
                Files.write(path, profilePic.getBytes());

                user.setProfile_pic(filename);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
            }
        }

        userRepository.save(user);
        return ResponseEntity.ok(user); // Return updated user info
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}