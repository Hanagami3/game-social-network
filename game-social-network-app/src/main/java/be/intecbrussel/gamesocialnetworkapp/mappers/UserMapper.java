package be.intecbrussel.gamesocialnetworkapp.mappers;

import be.intecbrussel.gamesocialnetworkapp.models.user.User;
import be.intecbrussel.gamesocialnetworkapp.requests.RegistrationRequest;
import be.intecbrussel.gamesocialnetworkapp.responses.UserResponse;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public User toUser (RegistrationRequest request){

        return User.builder()
                .id(request.getId())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .password(request.getPassword())
                .email(request.getEmail())
                .build();
    }

    public UserResponse toUserResponse (User user){

        return UserResponse.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .password(user.getPassword())
                .email(user.getEmail())
                .build();
    }
}
