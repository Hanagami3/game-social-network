package be.intecbrussel.gamesocialnetworkapp;

import be.intecbrussel.gamesocialnetworkapp.models.user.Role;
import be.intecbrussel.gamesocialnetworkapp.repositories.user.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class GameSocialNetworkAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(GameSocialNetworkAppApplication.class, args);
    }

    @Bean
    public CommandLineRunner runner(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.findByName("USER").isEmpty()){
                roleRepository.save(
                        Role.builder().name("USER").build()
                );
            }
        };
    }
}
