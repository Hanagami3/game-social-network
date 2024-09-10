package be.intecbrussel.gamesocialnetworkapp.controllers;

import be.intecbrussel.gamesocialnetworkapp.models.user.User;
import be.intecbrussel.gamesocialnetworkapp.requests.LikeRequest;
import be.intecbrussel.gamesocialnetworkapp.services.LikeService;
import be.intecbrussel.gamesocialnetworkapp.services.security.JwtService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("likes")
@RequiredArgsConstructor
@Tag(name = "like")
public class LikeController {

    private final LikeService likeService;
    private final JwtService jwtService;

    @PostMapping
    public ResponseEntity<Long> saveLike(
            @Valid @RequestBody LikeRequest request,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(likeService.save(request, connectedUser));
    }

    @GetMapping("/like-count")
    public ResponseEntity<Map<Long, Long>> getLikesCountByPost(){
        Map<Long, Long> likesCount = likeService.getLikesCountByPost();
        return ResponseEntity.ok(likesCount);
    }


    @DeleteMapping("/{like-id}")
    public ResponseEntity<Boolean> deleteLikeById(
            @PathVariable("like-id") Long likeId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(likeService.deleteLike(likeId, connectedUser));
    }

    @GetMapping("/{postId}/liked")
    public ResponseEntity<Boolean> isPostLiked(@RequestHeader("Authorization") String token, @PathVariable Long postId) {
        boolean hasLiked = likeService.hasUserLikedPost(token, postId);
        return ResponseEntity.ok(hasLiked);
    }
}
