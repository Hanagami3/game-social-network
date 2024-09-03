package be.intecbrussel.gamesocialnetworkapp.repositories;

import be.intecbrussel.gamesocialnetworkapp.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {

    @Query("""
            SELECT post
            FROM Post post
            WHERE post.archived = false
            AND post.shareable = true
            AND post.author.id != :userId
            """)
    Page<Post> findAllDisplayablePosts(Pageable pageable, Long userId);
}
