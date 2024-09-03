import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostRequest} from "../../../../services/models/post-request";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
  ],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent {

  errorMsg: Array<String> = [];
  selectedPostImage: any;
  selectedImage: string | undefined;
  postRequest: PostRequest = {content: "", title: ""};


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
}
