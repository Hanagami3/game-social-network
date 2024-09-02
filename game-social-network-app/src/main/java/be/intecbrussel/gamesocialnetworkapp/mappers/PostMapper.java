package be.intecbrussel.gamesocialnetworkapp.mappers;

import be.intecbrussel.gamesocialnetworkapp.models.Post;
import be.intecbrussel.gamesocialnetworkapp.requests.PostRequest;
import be.intecbrussel.gamesocialnetworkapp.responses.PostResponse;
import be.intecbrussel.gamesocialnetworkapp.utils.FileUtils;
import org.springframework.stereotype.Service;

@Service
public class PostMapper {

    public Post toPost(PostRequest request) {

        return Post.builder()
                .id(request.id())
                .title(request.title())
                .content(request.content())
                .resume(request.resume())
                .archived(false)
                .shareable(request.shareable())
                .build();
    }


    public PostResponse toBookResponse(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .resume(post.getResume())
                .archived(post.isArchived())
                .shareable(post.isShareable())
                .author(post.getAuthor().getFullName())
                .image(FileUtils.readFileFromLocation(post.getImage()))
                .build();

    }
}
