package be.intecbrussel.gamesocialnetworkapp.controllers;

import be.intecbrussel.gamesocialnetworkapp.models.Comment;
import be.intecbrussel.gamesocialnetworkapp.requests.CommentRequest;
import be.intecbrussel.gamesocialnetworkapp.responses.CommentResponse;
import be.intecbrussel.gamesocialnetworkapp.responses.PageResponse;
import be.intecbrussel.gamesocialnetworkapp.responses.PostResponse;
import be.intecbrussel.gamesocialnetworkapp.services.CommentService;
import be.intecbrussel.gamesocialnetworkapp.services.PostService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("comments")
@RequiredArgsConstructor
@Tag(name = "Comment")
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;

    @PostMapping
    public ResponseEntity<Long> saveComment(
            @Valid @RequestBody CommentRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(commentService.save(request, connectedUser));
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity<CommentResponse> findCommentById(
        @PathVariable("comment-id") Long commentId,
        Authentication connectedUser
    ){
        return ResponseEntity.ok(commentService.findById(commentId, connectedUser));
    }

    @GetMapping("/post/{post-id}")
    public ResponseEntity<PageResponse<CommentResponse>> findAllCommentByPost(
            @PathVariable("post-id") Long postId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(commentService.finAllCommentByPost(postId, page, size, connectedUser));
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity<Boolean> deleteById(
            @PathVariable("comment-id") Long commentId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(commentService.deleteComment(commentId, connectedUser));
    }
}
