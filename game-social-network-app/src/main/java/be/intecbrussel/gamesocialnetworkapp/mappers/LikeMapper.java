package be.intecbrussel.gamesocialnetworkapp.mappers;

import be.intecbrussel.gamesocialnetworkapp.models.Like;
import be.intecbrussel.gamesocialnetworkapp.models.Post;
import be.intecbrussel.gamesocialnetworkapp.requests.LikeRequest;
import org.springframework.stereotype.Service;

@Service
public class LikeMapper {

    public Like toLike(LikeRequest request){
        return Like.builder()
                .id(request.id())
                .post(Post.builder()
                        .id(request.postId())
                        .archived(false)
                        .shareable(false)
                        .build()
                )
                .build();
    }
}

