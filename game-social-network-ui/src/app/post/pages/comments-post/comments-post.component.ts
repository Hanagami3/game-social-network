import { Component, OnInit } from '@angular/core';
import {PostResponse} from "../../../services/models/post-response";
import {PageResponseCommentResponse} from "../../../services/models/page-response-comment-response";
import {PostService} from "../../../services/services/post.service";
import {CommentService} from "../../../services/services/comment.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {CommentRequest} from "../../../services/models/comment-request";
import {DeleteById$Params} from "../../../services/fn/comment/delete-by-id";

@Component({
  selector: 'app-comments-post',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './comments-post.component.html',
  styleUrl: './comments-post.component.scss'
})


export class CommentsPostComponent implements OnInit{
  errorMsg: Array<String> = [];
  post: PostResponse = {};
  comment: PageResponseCommentResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  private postId= 0;
  commentRequest: CommentRequest = {body:"", postId: this.postId};
  commentId: number | undefined;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['postId'];
    if (this.postId) {
      this.postService.findPostById({
        'post-id': this.postId
      }).subscribe({
        next: (post) => {
          this.post = post;
          this.findAllComments();
          // Initialiser commentRequest après avoir récupéré le post
          this.commentRequest = { body: '', postId: this.postId };
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du post:', err);
        }
      });
    } else {
      console.error('Post ID is not defined');
    }
    this.commentId = this.commentService.getCommentId();
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

  goToPage(page: number) {
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

    saveComment() {
      this.commentService.saveComment({
        body: this.commentRequest
      }).subscribe({
        next: (commentId) => {
          this.findAllComments();
          this.commentRequest.body = '';
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        }
      });
    }


    saveComment1(){
    this.router.navigate(['/post'])
  }

  // deleteComment(id: any) {
  //   this.commentService.findPostById1(id).subscribe({
  //     next: () => {
  //       this.router.navigate(['/post']);
  //     }
  //   })
  // }

  deleteComment(commentId: number): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      const params: DeleteById$Params = { 'comment-id': commentId };

      this.commentService.deleteById(params).subscribe({
        next: (success) => {
          if (success) {
            alert('Comment deleted successfully.');
            this.postId = this.activatedRoute.snapshot.params['postId'];
            this.router.navigate(['/post']);
          } else {
            alert('Failed to delete the comment.');
          }
        },
        error: (err) => {
          console.error('Error deleting comment', err);
          alert('Failed to delete the comment. Please try again later.');
        }
      });
    }
  }


}
