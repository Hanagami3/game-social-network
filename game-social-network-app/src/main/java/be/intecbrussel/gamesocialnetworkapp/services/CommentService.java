package be.intecbrussel.gamesocialnetworkapp.services;

import be.intecbrussel.gamesocialnetworkapp.exceptions.OperationNotPermittedException;
import be.intecbrussel.gamesocialnetworkapp.mappers.CommentMapper;
import be.intecbrussel.gamesocialnetworkapp.models.Comment;
import be.intecbrussel.gamesocialnetworkapp.models.Post;
import be.intecbrussel.gamesocialnetworkapp.models.user.User;
import be.intecbrussel.gamesocialnetworkapp.repositories.CommentRepository;
import be.intecbrussel.gamesocialnetworkapp.repositories.PostRepository;
import be.intecbrussel.gamesocialnetworkapp.requests.CommentRequest;
import be.intecbrussel.gamesocialnetworkapp.responses.CommentResponse;
import be.intecbrussel.gamesocialnetworkapp.responses.PageResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final PostRepository postRepository;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;

    public Long save(CommentRequest request, Authentication connectedUser) {
        Post post = postRepository.findById(request.postId())
                .orElseThrow(() -> new EntityNotFoundException("No post found with ID:: " + request.postId()));
        if (post.isArchived() || !post.isShareable()) {
            throw new OperationNotPermittedException("You cannot give a comment for an archived or not shareable post");
        }
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(post.getAuthor().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot give a comment to you own post");
        }
        Comment comment = commentMapper.toComment(request);
        return commentRepository.save(comment).getId();
    }

    public PageResponse<CommentResponse> finAllCommentByPost(Long postId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Comment> comments = commentRepository.findAllByPostId(postId, pageable);
        List<CommentResponse> commentResponses = comments.stream()
                .map(c -> commentMapper.toCommentResponse(c, user.getId()))
                .toList();
        return new PageResponse<>(
                commentResponses,
                comments.getNumber(),
                comments.getSize(),
                comments.getTotalElements(),
                comments.getTotalPages(),
                comments.isFirst(),
                comments.isLast()
        );
    }
}
