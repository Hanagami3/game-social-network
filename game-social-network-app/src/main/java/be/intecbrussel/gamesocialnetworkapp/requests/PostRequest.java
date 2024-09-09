package be.intecbrussel.gamesocialnetworkapp.requests;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PostRequest(


        Long id,

        @NotNull(message = "title is mandatory")
        @NotEmpty(message = "title is mandatory")
        @NotBlank(message = "title is mandatory")
        String title,

        @NotNull(message = "content is mandatory")
        @NotEmpty(message = "content is mandatory")
        @NotBlank(message = "content is mandatory")
        String content,

        String resume,
        boolean shareable
) {
}
