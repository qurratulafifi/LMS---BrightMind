package com.GroupProject.BrightMind.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "content")
public class Content {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties(value = {"contents", "password", "email"}, allowGetters = true)
    private User user;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content_file;

    @Column(name = "course_name")
    private String courseName;

    public String getUsername() {
        return user != null ? user.getName() : "Unknown";
    }
}
