package be.intecbrussel.gamesocialnetworkapp.repositories.user;

import be.intecbrussel.gamesocialnetworkapp.models.user.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByToken(String token);
}
