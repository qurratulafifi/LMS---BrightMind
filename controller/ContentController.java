package com.GroupProject.BrightMind.controller;

import com.GroupProject.BrightMind.model.Content;
import com.GroupProject.BrightMind.service.ContentService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/content")
@CrossOrigin(origins = "http://localhost:63342")
public class ContentController {

    @Autowired
    private ContentService service;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<?> serveFile(@PathVariable String filename, HttpServletRequest request) {
        try {
            Path filePath = Paths.get("C:/Users/User/Downloads/BrightMind/uploads").resolve(filename).normalize();
            UrlResource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            String contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
            if (contentType == null) contentType = "application/octet-stream";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error serving file.");
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> submitContent(
            @RequestParam("title") String title,
            @RequestParam("content_file") MultipartFile file,
            @RequestParam("courseName") String course_name,
            @RequestParam("userId") Long userId
    ) {
        Content content = service.saveWithFile(title, file, course_name, userId);
        return ResponseEntity.ok(content);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Content obj) {
        Content content = service.findById(id).orElse(null);
        if (content == null) return ResponseEntity.notFound().build();

        content.setTitle(obj.getTitle()); // ONLY update title
        return ResponseEntity.ok(service.save(content));
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("Content deleted");
    }


}
