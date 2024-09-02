package be.intecbrussel.gamesocialnetworkapp.mappers;

import be.intecbrussel.gamesocialnetworkapp.models.Comment;
import be.intecbrussel.gamesocialnetworkapp.models.Post;
import be.intecbrussel.gamesocialnetworkapp.requests.CommentRequest;
import be.intecbrussel.gamesocialnetworkapp.responses.CommentResponse;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class CommentMapper {

    public Comment toComment(CommentRequest request) {
        return Comment.builder()
                .body(request.body())
                .post(Post.builder()
                        .id(request.postId())
                        .archived(false)
                        .shareable(false)
                        .build()
                )
                .build();
    }

    public CommentResponse toCommentResponse(Comment comment, Long id) {
        return CommentResponse.builder()
                .body(comment.getBody())
                .ownComment(Objects.equals(comment.getCreatedBy(), id))
                .build();
    }
}
