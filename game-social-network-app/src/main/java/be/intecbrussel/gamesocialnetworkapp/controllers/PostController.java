package be.intecbrussel.gamesocialnetworkapp.controllers;

import be.intecbrussel.gamesocialnetworkapp.requests.PostRequest;
import be.intecbrussel.gamesocialnetworkapp.responses.PageResponse;
import be.intecbrussel.gamesocialnetworkapp.responses.PostResponse;
import be.intecbrussel.gamesocialnetworkapp.services.PostService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("posts")
@RequiredArgsConstructor
@Tag(name = "Post")
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<Long> savePost(
            @Valid @RequestBody PostRequest request,
            Authentication connectedUser
    ){
        return ResponseEntity.ok((postService.save(request, connectedUser)));
    }

    @GetMapping("{post-id}")
    public ResponseEntity<PostResponse> findPostById(
            @PathVariable("post-id") Long postId
    ){
        return ResponseEntity.ok(postService.findById(postId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<PostResponse>> findAllPosts(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(postService.findAllPosts(page, size, connectedUser));
    }


    @GetMapping("/author")
    public ResponseEntity<PageResponse<PostResponse>> findAllPostByAuthor(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(postService.findAllPostsByAuthor(page, size, connectedUser));

    }

    @PatchMapping("/shareable/{post-id}")
    public ResponseEntity<Long> updateShareableStatus(
            @PathVariable("post-id") Long postId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(postService.updateShareableStatus(postId, connectedUser));
    }

    @PatchMapping("/archived/{post-id}")
    public ResponseEntity<Long> updateArchivedStatus(
            @PathVariable("post-id") Long postId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(postService.updateArchivedStatus(postId, connectedUser));
    }

    @PostMapping(value = "image/{post-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadImage(
            @PathVariable("post-id") Long postId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ){
        postService.uploadPostImage(file, connectedUser, postId);
        return ResponseEntity.accepted().build();
    }


}
