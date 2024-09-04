import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostResponse} from "../../../services/models/post-response";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {


  private _post: PostResponse = {};
  private _manage: boolean = false;
  private _postImage: string | undefined;


  get post(): PostResponse {
    return this._post;
  }

  @Input()
  set post(value: PostResponse) {
    this._post = value;
  }

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  get postImage(): string | undefined {
    if (this._post.image){
      return 'data:image/png;base64,' + this._post.image;
    }
    return 'https://picsum.photos/1900/800';
  }

  @Output() private share: EventEmitter<PostResponse> = new EventEmitter<PostResponse>();
  @Output() private archive: EventEmitter<PostResponse> = new EventEmitter<PostResponse>();
  @Output() private edit: EventEmitter<PostResponse> = new EventEmitter<PostResponse>();
  @Output() private details: EventEmitter<PostResponse> = new EventEmitter<PostResponse>();
  @Output() private comments: EventEmitter<PostResponse> = new EventEmitter<PostResponse>();
  @Output() private like: EventEmitter<PostResponse> = new EventEmitter<PostResponse>();

  onAddLike() {
    this.like.emit(this._post)

  }

  onCommentView() {
    this.comments.emit(this._post)

  }

  onEdit() {
    this.edit.emit(this._post)

  }

  onShare() {
    this.share.emit(this._post)

  }

  onArchive() {
    this.archive.emit(this._post)
  }

  onSowDetails() {
    this.details.emit(this._post)
  }
}
