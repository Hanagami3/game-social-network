import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PostCardComponent} from "../../component/post-card/post-card.component";
import {PageResponsePostResponse} from "../../../services/models/page-response-post-response";
import {PostService} from "../../../services/services/post.service";
import {Router, RouterLink} from "@angular/router";
import {PostResponse} from "../../../services/models/post-response";
import {LikeService} from "../../../services/services/like.service";
import {LikeRequest} from "../../../services/models/like-request";
import {SaveLike$Params} from "../../../services/fn/like/save-like";
import {DeleteLikeById$Params} from "../../../services/fn/like/delete-like-by-id";
import {IsPostLiked$Params} from "../../../services/fn/like/is-post-liked";

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [
    NgForOf,
    PostCardComponent,
    RouterLink
  ],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss'
})
export class MyPostsComponent implements OnInit{

  errorMsg: Array<String> = [];
  postResponse: PageResponsePostResponse = {};
  likeRequest: LikeRequest = {postId: 0}
  page = 0;
  size = 2;


  constructor(
    private postService: PostService,
    private likeService: LikeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllPosts();
  }


  private findAllPosts() {
    this.postService.findAllPostByAuthor({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (posts) => {
        console.log(posts);
        this.postResponse = posts;
        this.updatePostLikeInfo();
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllPosts();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllPosts();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllPosts();
  }

  goToNextPage() {
    this.page++;
    this.findAllPosts();
  }

  goToLastPage() {
    this.page = this.postResponse.totalPages as number -1;
    this.findAllPosts();
  }

  get isLastPage(): boolean {
    return this.page == this.postResponse.totalPages as number -1;
  }

  // addLikePost(post: PostResponse) {
  //   if (post.id === undefined) {
  //     console.error('Post ID is undefined');
  //     return;
  //   }
  //
  //   const likeRequest: LikeRequest = {
  //     postId: post.id
  //   };
  //
  //   const params: SaveLike$Params = {
  //     body: likeRequest
  //   };
  //
  //   this.likeService.saveLike(params).subscribe({
  //     next: (response) => {
  //       console.log('Like ajouté avec succès. Réponse:', response);
  //       // Optionnel: Mettez à jour l'état du post ou de l'interface utilisateur
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors de l\'ajout du like:', err);
  //     }
  //   });
  // }

  private getAuthorizationHeader(): string {
    const token = localStorage.getItem('jwtToken'); // Assure-toi que 'jwtToken' est la clé utilisée pour stocker le token
    return token ? `Bearer ${token}` : '';
  }

  private updatePostLikeInfo() {
    this.postResponse.content?.forEach(post => {
      if (post.id !== undefined) {
        const params: IsPostLiked$Params = {
          postId: post.id,
          Authorization: this.getAuthorizationHeader()
        };
        this.likeService.isPostLiked(params).subscribe({
          next: (hasLiked) => {
            post.hasLiked = hasLiked;
          },
          error: (err) => {
            console.error('Erreur lors de la vérification du like:', err);
          }
        });
      }
    });
  }

  toggleLikePost(post: PostResponse) {
    if (post.id === undefined) {
      console.error('Post ID is undefined');
      return;
    }

    const likeRequest: LikeRequest = {
      postId: post.id
    };

    if (post.hasLiked) {
      const params: DeleteLikeById$Params = { 'like-id': post.id };
      this.likeService.deleteLikeById(params).subscribe({
        next: () => {
          console.log('Like supprimé avec succès');
          post.hasLiked = false;
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du like:', err);
        }
      });
    } else {
      const params: SaveLike$Params = { body: likeRequest };
      this.likeService.saveLike(params).subscribe({
        next: (response) => {
          console.log('Like ajouté avec succès. Réponse:', response);
          post.hasLiked = true;
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du like:', err);
        }
      });
    }
  }



  archivePost(post: PostResponse) {
    this.postService.updateArchivedStatus({
      'post-id': post.id as number
    }).subscribe({
      next: () => {
        post.archived = !post.archived
      }
    });
  }

  sharePost(post: PostResponse) {
    this.postService.updateShareableStatus({
      'post-id': post.id as number,
    }).subscribe({
      next: () => {
        post.shareable = !post.shareable;
      }
      });
  }

  editPost(post: PostResponse) {
    this.router.navigate(['post', 'manage', post.id]);
  }

  newPost() {
    this.router.navigate(['post', 'manage']);
  }
}
