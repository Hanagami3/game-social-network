package be.intecbrussel.gamesocialnetworkapp.requests;

import jakarta.validation.constraints.NotNull;

public record LikeRequest (

    Long id,

    @NotNull(message = "500")
    Long postId

){}
