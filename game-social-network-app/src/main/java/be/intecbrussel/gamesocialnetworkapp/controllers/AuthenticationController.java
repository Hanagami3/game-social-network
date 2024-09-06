package be.intecbrussel.gamesocialnetworkapp.controllers;


import be.intecbrussel.gamesocialnetworkapp.requests.AuthenticationRequest;
import be.intecbrussel.gamesocialnetworkapp.responses.AuthenticationResponse;
import be.intecbrussel.gamesocialnetworkapp.requests.RegistrationRequest;
import be.intecbrussel.gamesocialnetworkapp.responses.UserResponse;
import be.intecbrussel.gamesocialnetworkapp.services.security.AuthenticationService;
import be.intecbrussel.gamesocialnetworkapp.services.security.UserDetailsServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthenticationService service;
    private final UserDetailsServiceImpl userDetailsService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(
            @RequestBody @Valid RegistrationRequest request
    ) throws MessagingException {
        service.register(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody @Valid AuthenticationRequest resquest
    ) {
        return ResponseEntity.ok(service.authenticate(resquest));
    }

    @GetMapping("/activate-account")
    public void confirm(
            @RequestParam String token
    ) throws MessagingException {
        service.activateAccount(token);
    }

    @GetMapping("{user-id}")
    public ResponseEntity<UserResponse> findUserById(
            @PathVariable("user-id") Long userId
    ){
        return ResponseEntity.ok(userDetailsService.findById(userId));
    }
}
