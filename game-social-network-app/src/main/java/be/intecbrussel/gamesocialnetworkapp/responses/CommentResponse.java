package be.intecbrussel.gamesocialnetworkapp.responses;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {

    private String body;
    private boolean ownComment;
}
