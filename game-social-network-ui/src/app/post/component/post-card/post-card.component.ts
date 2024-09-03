import {Component, Input} from '@angular/core';
import {PostResponse} from "../../../services/models/post-response";

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  private _post: PostResponse = {};

  get post(): PostResponse {
    return this._post;
  }

  @Input()
  set post(value: PostResponse) {
    this._post = value;
  }

  private _postImage: string | undefined;

  get postImage(): string | undefined {
    if (this._post.image){
      return 'data:image/png;base64,' + this._post.image;
    }
    return 'https://picsum.photos/1900/800';
  }

}
