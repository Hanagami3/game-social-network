import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PostCardComponent} from "../../component/post-card/post-card.component";
import {PageResponsePostResponse} from "../../../services/models/page-response-post-response";
import {PostService} from "../../../services/services/post.service";
import {Router, RouterLink} from "@angular/router";
import {PostResponse} from "../../../services/models/post-response";

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

  postResponse: PageResponsePostResponse = {};
  page = 0;
  size = 2;


  constructor(
    private postService: PostService,
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
    this.router.navigate(['manage']);
  }
}
