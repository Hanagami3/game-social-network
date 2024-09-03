import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostRequest} from "../../../../services/models/post-request";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {PostService} from "../../../../services/services/post.service";

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent {

  errorMsg: Array<String> = [];
  selectedPostImage: any;
  selectedImage: string | undefined;
  postRequest: PostRequest = {content: "", title: ""};

  constructor(
    private postService: PostService,
    private router: Router
  ){}

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
