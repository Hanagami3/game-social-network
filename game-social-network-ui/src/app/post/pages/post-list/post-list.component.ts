import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/services/post.service";
import {Router} from "@angular/router";
import {PageResponsePostResponse} from "../../../services/models/page-response-post-response";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  postResponse: PageResponsePostResponse = {};
  private page = 0;
  private size = 5;

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
        this.postResponse = posts;
      }
    })
  }
}
