package be.intecbrussel.gamesocialnetworkapp.controller;

import be.intecbrussel.gamesocialnetworkapp.controllers.AuthenticationController;
import be.intecbrussel.gamesocialnetworkapp.controllers.PostController;
import be.intecbrussel.gamesocialnetworkapp.models.Post;
import be.intecbrussel.gamesocialnetworkapp.models.user.User;
import be.intecbrussel.gamesocialnetworkapp.repositories.PostRepository;
import be.intecbrussel.gamesocialnetworkapp.repositories.user.UserRepository;
import be.intecbrussel.gamesocialnetworkapp.responses.UserResponse;
import be.intecbrussel.gamesocialnetworkapp.services.security.AuthenticationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

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

    @Autowired
    private AuthenticationController authenticationController;

    @Test
    void testListPosts(){
        Page<Post> testListPosts = postRepository.findAllDisplayablePosts(any(), 3L);

        assertThat(testListPosts.getContent().size()).isEqualTo(5);
    }

    @Test
    void testFindUserById(){
        ResponseEntity<UserResponse> testUser = authenticationController.findUserById(3L);
        System.out.println(testUser);
    }


}
