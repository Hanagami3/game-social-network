package be.intecbrussel.gamesocialnetworkapp.responses;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {

    private Long id;
    private String body;
    private String author;
    private boolean ownComment;
}
