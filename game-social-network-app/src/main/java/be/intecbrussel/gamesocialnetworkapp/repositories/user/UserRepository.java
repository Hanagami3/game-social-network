package be.intecbrussel.gamesocialnetworkapp.repositories.user;

import be.intecbrussel.gamesocialnetworkapp.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
