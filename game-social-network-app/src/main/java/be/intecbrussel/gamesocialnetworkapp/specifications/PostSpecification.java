package be.intecbrussel.gamesocialnetworkapp.specifications;

import be.intecbrussel.gamesocialnetworkapp.models.Post;
import org.springframework.data.jpa.domain.Specification;

public class PostSpecification {

    public static Specification<Post> withAuthorId(Long authorId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("author").get("id"), authorId);
    }
}
