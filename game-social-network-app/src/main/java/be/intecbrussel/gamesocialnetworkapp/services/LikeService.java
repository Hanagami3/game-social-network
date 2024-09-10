package be.intecbrussel.gamesocialnetworkapp.services;

import be.intecbrussel.gamesocialnetworkapp.exceptions.OperationNotPermittedException;
import be.intecbrussel.gamesocialnetworkapp.mappers.LikeMapper;
import be.intecbrussel.gamesocialnetworkapp.models.Like;
import be.intecbrussel.gamesocialnetworkapp.models.Post;
import be.intecbrussel.gamesocialnetworkapp.models.user.User;
import be.intecbrussel.gamesocialnetworkapp.repositories.LikeRepository;
import be.intecbrussel.gamesocialnetworkapp.repositories.PostRepository;
import be.intecbrussel.gamesocialnetworkapp.requests.LikeRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final PostRepository postRepository;
    private final LikeMapper likeMapper;
    private final LikeRepository likeRepository;

    public Long save(LikeRequest request, Authentication connectedUser){
        Post post = postRepository.findById(request.postId())
                .orElseThrow(() -> new EntityNotFoundException("No post found with ID:: " + request.postId()));
        if (post.isArchived() || !post.isShareable()) {
            throw new OperationNotPermittedException("You cannot give a like for an archived or not shareable post");
        }
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(post.getAuthor().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot give a like to you own post");
        }
        Like like = likeMapper.toLike(request);
        return likeRepository.save(like).getId();
    }

    public Boolean deleteLike(Long likeId, Authentication connectedUser){
        Like like = likeRepository.findById(likeId)
                .orElseThrow(() -> new EntityNotFoundException("No like found with ID:: " + likeId));
        User user = ((User) connectedUser.getPrincipal());
        if (likeRepository.existsById(like.getId())){
            likeRepository.deleteById(likeId);
            return true;
        }
        return false;
    }
}
