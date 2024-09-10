package be.intecbrussel.gamesocialnetworkapp.repositories;

import be.intecbrussel.gamesocialnetworkapp.models.Like;
import be.intecbrussel.gamesocialnetworkapp.services.LikeService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {


    @Query("""
        SELECT l.post.id,
        COUNT(l)
        FROM Like l
        GROUP BY l.post.id
    """)
    List<Object[]> countLikesByPost();
}
