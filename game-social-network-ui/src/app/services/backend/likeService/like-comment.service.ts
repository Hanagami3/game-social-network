import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LikeComment} from "../../../models/backend/like-comment.model";


@Injectable({
  providedIn: 'root'
})
export class LikeCommentService {
  private apiUrl = 'http://localhost:8080/api/v1/likeComment';

  constructor(private http: HttpClient) { }

  getLikeComments(): Observable<LikeComment[]>{
    return this.http.get<LikeComment[]>(this.apiUrl)
  }
}
