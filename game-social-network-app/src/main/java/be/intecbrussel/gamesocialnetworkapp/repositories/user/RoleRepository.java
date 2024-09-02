package be.intecbrussel.gamesocialnetworkapp.repositories.user;

import be.intecbrussel.gamesocialnetworkapp.models.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);
}
