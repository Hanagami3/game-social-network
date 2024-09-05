import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostRequest} from "../../../services/models/post-request";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PostService} from "../../../services/services/post.service";

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './manage-post.component.html',
  styleUrl: './manage-post.component.scss'
})
export class ManagePostComponent implements OnInit{

  errorMsg: Array<String> = [];
  selectedPostImage: any;
  selectedImage: string | undefined;
  postRequest: PostRequest = {content: "", title: ""};

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
      const postId = this.activatedRoute.snapshot.params['postId'];
      if (postId) {
        this.postService.findPostById({
          'post-id': postId
        }).subscribe(post => {
          this.postRequest = {
            id: post.id,
            title: post.title as string,
            resume: post.resume,
            content: post.content as string,
            shareable: post.shareable
          }
          if (post.image){
            this.selectedImage = 'data:image/png;base64,' + post.image;
          }
        })
      }
    }

  onFileSelected(event: any) {
    this.selectedPostImage = event.target.files[0];
    console.log(this.selectedPostImage);

    if (this.selectedPostImage) {

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage= reader.result as string;
      };
      reader.readAsDataURL(this.selectedPostImage);
    }
  }

  savePost() {
    this.postService.savePost({
      body: this.postRequest,
    }).subscribe({
      next:(postId) => {
        this.postService.uploadImage({
          'post-id': postId,
          body:{
            file: this.selectedPostImage
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/post/my-posts']);
          }
        })
      },
      error: (err) => {
        this.errorMsg = err.error.validationErrors;
      }
    })
  }
}
