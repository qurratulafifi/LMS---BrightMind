package com.GroupProject.BrightMind.repository;
import com.GroupProject.BrightMind.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findByCourseName(String courseName);
}
