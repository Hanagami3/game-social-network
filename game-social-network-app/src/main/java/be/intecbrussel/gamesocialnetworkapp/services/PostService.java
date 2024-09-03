package be.intecbrussel.gamesocialnetworkapp.services;

import be.intecbrussel.gamesocialnetworkapp.exceptions.OperationNotPermittedException;
import be.intecbrussel.gamesocialnetworkapp.mappers.PostMapper;
import be.intecbrussel.gamesocialnetworkapp.models.Post;
import be.intecbrussel.gamesocialnetworkapp.models.user.User;
import be.intecbrussel.gamesocialnetworkapp.requests.PostRequest;
import be.intecbrussel.gamesocialnetworkapp.repositories.PostRepository;
import be.intecbrussel.gamesocialnetworkapp.responses.PostResponse;
import be.intecbrussel.gamesocialnetworkapp.responses.PageResponse;
import be.intecbrussel.gamesocialnetworkapp.specifications.PostSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final FileStorageService fileStorageService;

    public Long save(PostRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Post post = postMapper.toPost(request);
        post.setAuthor(user);
        return postRepository.save(post).getId();
    }

    public PostResponse findById(Long postId) {
        return postRepository.findById(postId)
                .map(postMapper::toPostResponse)
                .orElseThrow(() -> new EntityNotFoundException("No post found with the ID: " + postId));
    }

    public PageResponse<PostResponse> findAllPosts(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Post> posts = postRepository.findAllDisplayablePosts(pageable, user.getId());
        List<PostResponse> postResponse = posts.stream()
                .map(postMapper::toPostResponse)
                .toList();
        return new PageResponse<>(
                postResponse,
                posts.getNumber(),
                posts.getSize(),
                posts.getTotalElements(),
                posts.getTotalPages(),
                posts.isFirst(),
                posts.isLast()
        );
    }


    public PageResponse<PostResponse> findAllPostsByAuthor(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Post> posts = postRepository.findAll(PostSpecification.withAuthorId(user.getId()), pageable);
        List<PostResponse> postResponse = posts.stream()
                .map(postMapper::toPostResponse)
                .toList();
        return new PageResponse<>(
                postResponse,
                posts.getNumber(),
                posts.getSize(),
                posts.getTotalElements(),
                posts.getTotalPages(),
                posts.isFirst(),
                posts.isLast()
        );
    }

    public Long updateShareableStatus(Long postId, Authentication connectedUser) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("No post found with the ID: " + postId));
        User user = ((User) connectedUser.getPrincipal());
        if (!Objects.equals(post.getAuthor().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot update others posts shareable status");
        }
        post.setShareable(!post.isShareable());
        postRepository.save(post);
        return postId;
    }

    public Long updateArchivedStatus(Long postId, Authentication connectedUser) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("No post found with the ID: " + postId));
        User user = ((User) connectedUser.getPrincipal());
        if (!Objects.equals(post.getAuthor().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot update others posts archived status");
        }
        post.setArchived(!post.isArchived());
        postRepository.save(post);
        return postId;
    }

    public void uploadPostImage(MultipartFile file, Authentication connectedUser, Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("No post found with the ID: " + postId));
        User user = ((User) connectedUser.getPrincipal());
        var postImage = fileStorageService.saveFile(file, user.getId());
        post.setImage(postImage);
        postRepository.save(post);
    }


}
