package be.intecbrussel.gamesocialnetworkapp.responses;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostResponse {

    private Long id;
    private String title;
    private String content;
    private String resume;
    private String author;
    private byte[] image;
    private boolean archived;
    private boolean shareable;
}
