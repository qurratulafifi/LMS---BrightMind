package com.GroupProject.BrightMind.service;
import com.GroupProject.BrightMind.model.Content;
import com.GroupProject.BrightMind.model.User;
import com.GroupProject.BrightMind.repository.ContentRepository;
import com.GroupProject.BrightMind.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ContentService {

    @Autowired
    private ContentRepository repository;

    @Autowired
    private UserRepository userRepository;
    private String filename;


    public List<Content> findAll() {
        return repository.findAll();
    }

    public Content save(Content obj) {
        return repository.save(obj);
    }
    public Content saveWithFile(String title, MultipartFile file, String courseName, Long userId) {
        try {
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get("C:/Users/User/Downloads/BrightMind/uploads", filename);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            Content content = new Content();
            content.setTitle(title);
            content.setContent_file(filename);
            content.setCourseName(courseName.replace(",", "").trim());

            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isPresent()) {
                content.setUser(userOpt.get());
            } else {
                System.out.println("❌ User not found with ID: " + userId);
            }

            return repository.save(content);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }
    public Content update(Long id, Content obj) {
        obj.setId(id);
        return repository.save(obj);
    }
    public void delete(Long id) {
        repository.deleteById(id);
    }
    public Optional<Content> findById(Long id) {
        return repository.findById(id);
    }
}
