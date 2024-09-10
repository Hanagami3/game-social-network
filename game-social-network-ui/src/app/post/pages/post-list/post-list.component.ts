import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/services/post.service";
import {Router, RouterLink} from "@angular/router";
import {PageResponsePostResponse} from "../../../services/models/page-response-post-response";
import {NgForOf} from "@angular/common";
import {PostCardComponent} from "../../component/post-card/post-card.component";
import {PostResponse} from "../../../services/models/post-response";
import {LikeRequest} from "../../../services/models/like-request";
import {SaveLike$Params} from "../../../services/fn/like/save-like";
import {LikeService} from "../../../services/services/like.service";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    NgForOf,
    PostCardComponent,
    RouterLink
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  postResponse: PageResponsePostResponse = {};
  page = 0;
  size = 6;

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
    this.postService.findAllPosts({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (posts) => {
        console.log(posts);
        this.postResponse = posts;
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

  singlePost(post: PostResponse) {
    this.router.navigate(['post','single-post', post.id])
  }

  commentsPost(post: PostResponse) {
    this.router.navigate(['post', 'comments-post', post.id]);
  }

  addLikePost(post: PostResponse) {
    if (post.id === undefined) {
      console.error('Post ID is undefined');
      return;
    }
    const likeRequest: LikeRequest = {
      postId: post.id
    };
    const params: SaveLike$Params = {
      body: likeRequest
    };
    this.likeService.saveLike(params).subscribe({
      next: (response) => {
        console.log('Like ajouté avec succès. Réponse:', response);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du like:', err);
      }
    });
  }
}
