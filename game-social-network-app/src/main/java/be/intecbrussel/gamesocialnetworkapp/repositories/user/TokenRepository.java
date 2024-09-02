package be.intecbrussel.gamesocialnetworkapp.repositories.user;

import be.intecbrussel.gamesocialnetworkapp.models.user.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Token findByToken(String token);
}
