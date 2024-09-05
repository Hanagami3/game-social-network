import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {PostResponse} from "../../../services/models/post-response";
import {PageResponseCommentResponse} from "../../../services/models/page-response-comment-response";
import {PostService} from "../../../services/services/post.service";
import {CommentService} from "../../../services/services/comment.service";

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss'
})

export class SinglePostComponent implements OnInit {
post: PostResponse = {};
comment: PageResponseCommentResponse = {};
page = 0;
size = 5;
pages: any = [];
private postId = 0;

constructor(
  private postservice: PostService,
  private commentService: CommentService,
  private activatedRoute: ActivatedRoute
) {
}
ngOnInit(): void {
  this.postId = this.activatedRoute.snapshot.params['postId'];
  if (this.postId) {
  this.postservice.findPostById({
    'post-id': this.postId
  }).subscribe({
    next: (post) => {
      this.post = post;
      this.findAllComments();
    }
  });
}
}

private findAllComments() {
  this.commentService.findAllCommentByPost({
    'post-id': this.postId,
    page: this.page,
    size: this.size
  }).subscribe({
    next: (data) => {
      this.comment = data;
    }
  });
}

gotToPage(page: number) {
  this.page = page;
  this.findAllComments();
}

goToFirstPage() {
  this.page = 0;
  this.findAllComments();
}

goToPreviousPage() {
  this.page --;
  this.findAllComments();
}

goToLastPage() {
  this.page = this.comment.totalPages as number - 1;
  this.findAllComments();
}

goToNextPage() {
  this.page++;
  this.findAllComments();
}

get isLastPage() {
  return this.page === this.comment.totalPages as number - 1;
}

}
