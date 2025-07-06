package com.GroupProject.BrightMind.service;

import com.GroupProject.BrightMind.model.User;
import com.GroupProject.BrightMind.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public User save(User user) {
        return repository.save(user);
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public User update(Long id, User updatedUser) {
        User existing = repository.findById(id).orElseThrow();
        existing.setName(updatedUser.getName());
        existing.setEmail(updatedUser.getEmail());
        existing.setPassword(updatedUser.getPassword());
        existing.setProfile_pic(updatedUser.getProfile_pic());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }
}

