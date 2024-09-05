package be.intecbrussel.gamesocialnetworkapp.controller;

import be.intecbrussel.gamesocialnetworkapp.controllers.PostController;
import be.intecbrussel.gamesocialnetworkapp.models.Post;
import be.intecbrussel.gamesocialnetworkapp.repositories.PostRepository;
import be.intecbrussel.gamesocialnetworkapp.repositories.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
public class PostControllerIT {

    @Autowired
    PostController postController;

    @Autowired
    PostRepository postRepository;



    @Autowired
    private UserRepository userRepository;

    @Test
    void testListPosts(){
        Page<Post> testListPosts = postRepository.findAllDisplayablePosts(any(), 3L);

        assertThat(testListPosts.getContent().size()).isEqualTo(5);
    }

}
