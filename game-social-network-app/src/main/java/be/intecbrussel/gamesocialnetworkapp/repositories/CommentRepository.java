package be.intecbrussel.gamesocialnetworkapp.repositories;

import be.intecbrussel.gamesocialnetworkapp.models.Comment;
import be.intecbrussel.gamesocialnetworkapp.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long>, JpaSpecificationExecutor<Comment> {

    @Query("""
            SELECT comment
            FROM Comment comment
            WHERE comment.post.id = :postId
            """)
    Page<Comment> findAllByPostId(Long postId, Pageable pageable);
}
