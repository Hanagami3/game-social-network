import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/services/post.service";
import {Router, RouterLink} from "@angular/router";
import {PageResponsePostResponse} from "../../../services/models/page-response-post-response";
import {NgForOf} from "@angular/common";
import {PostCardComponent} from "../../component/post-card/post-card.component";
import {PostResponse} from "../../../services/models/post-response";

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
}
