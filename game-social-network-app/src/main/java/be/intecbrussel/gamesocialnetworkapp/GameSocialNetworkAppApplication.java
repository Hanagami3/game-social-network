package be.intecbrussel.gamesocialnetworkapp;

import be.intecbrussel.gamesocialnetworkapp.models.Post;
import be.intecbrussel.gamesocialnetworkapp.models.user.Role;
import be.intecbrussel.gamesocialnetworkapp.repositories.PostRepository;
import be.intecbrussel.gamesocialnetworkapp.repositories.user.RoleRepository;
import be.intecbrussel.gamesocialnetworkapp.repositories.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
public class GameSocialNetworkAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(GameSocialNetworkAppApplication.class, args);
    }

    @Bean
    public CommandLineRunner runner(RoleRepository roleRepository, PostRepository postRepository, UserRepository userRepository //, LikeRepository likeRepository
    ) {
        return args -> {
            if (roleRepository.findByName("USER").isEmpty()){
                roleRepository.save(
                        Role.builder().name("USER").build()
                );
            }
//            if (postRepository.findById(1L).isEmpty()){
//                postRepository.save(
//                        Post.builder()
//                                .title("Post 1")
//                                .createdBy(1L)
//                                .content("content1")
//                                .author(userRepository.findAll().get(0))
//                                .build()
//                );
//            }
//            if(likeRepository.findById(1L).isEmpty()){
//                likeRepository.save(
//                        Like.builder()
//                                .post(postRepository.findAll().get(0))
//                                .author(userRepository.findAll().get(0))
//                                .build()
//                );
//            }
        };
    }
}
