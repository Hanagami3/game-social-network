package be.intecbrussel.gamesocialnetworkapp.controllers;

import be.intecbrussel.gamesocialnetworkapp.requests.LikeRequest;
import be.intecbrussel.gamesocialnetworkapp.services.LikeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("likes")
@RequiredArgsConstructor
@Tag(name = "like")
public class LikeController {

    private final LikeService likeService;

    @PostMapping
    public ResponseEntity<Long> saveLike(
            @Valid @RequestBody LikeRequest request,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(likeService.save(request, connectedUser));
    }

    @GetMapping

    @DeleteMapping("/{like-id}")
    public ResponseEntity<Boolean> deleteLikeById(
            @PathVariable("like-id") Long likeId,
            Authentication connectedUser
    ){
        ResponseEntity.ok(likeService.deleteLike(likeId, connectedUser));
    }
}
