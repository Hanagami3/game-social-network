import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/services/post.service";
import {Router} from "@angular/router";
import {PageResponsePostResponse} from "../../../services/models/page-response-post-response";
import {NgForOf} from "@angular/common";
import {PostCardComponent} from "../../component/post-card/post-card.component";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    NgForOf,
    PostCardComponent
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
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
}
