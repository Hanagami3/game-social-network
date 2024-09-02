package be.intecbrussel.gamesocialnetworkapp.requests;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PostRequest(

        Long id,

        @NotNull(message = "100")
        @NotEmpty(message = "100")
        @NotBlank(message = "100")
        String title,

        @NotNull(message = "101")
        @NotEmpty(message = "101")
        @NotBlank(message = "101")
        String content,

        String resume,
        boolean shareable
) {
}
