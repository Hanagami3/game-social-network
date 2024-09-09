package be.intecbrussel.gamesocialnetworkapp.requests;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CommentRequest(

        Long id,

        @NotNull(message = "200")
        @NotEmpty(message = "200")
        @NotBlank(message = "200")
        String body,

        @NotNull(message = "201")
        Long postId
) {
}
