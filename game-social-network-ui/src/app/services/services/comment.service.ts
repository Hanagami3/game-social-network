/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CommentResponse } from '../models/comment-response';
import { deleteById } from '../fn/comment/delete-by-id';
import { DeleteById$Params } from '../fn/comment/delete-by-id';
import { findAllCommentByPost } from '../fn/comment/find-all-comment-by-post';
import { FindAllCommentByPost$Params } from '../fn/comment/find-all-comment-by-post';
import { findCommentById } from '../fn/comment/find-comment-by-id';
import { FindCommentById$Params } from '../fn/comment/find-comment-by-id';
import { PageResponseCommentResponse } from '../models/page-response-comment-response';
import { saveComment } from '../fn/comment/save-comment';
import { SaveComment$Params } from '../fn/comment/save-comment';

@Injectable({ providedIn: 'root' })
export class CommentService extends BaseService {
  private commentId: number | undefined;

  setCommentId(id: number): void {
    this.commentId = id;
  }

  getCommentId(): number {
    return <number>this.commentId;
  }

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }



  /** Path part for operation `saveComment()` */
  static readonly SaveCommentPath = '/comments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveComment$Response(params: SaveComment$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveComment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveComment(params: SaveComment$Params, context?: HttpContext): Observable<number> {
    return this.saveComment$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findCommentById()` */
  static readonly FindCommentByIdPath = '/comments/{comment-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCommentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCommentById$Response(params: FindCommentById$Params, context?: HttpContext): Observable<StrictHttpResponse<CommentResponse>> {
    return findCommentById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCommentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCommentById(params: FindCommentById$Params, context?: HttpContext): Observable<CommentResponse> {
    return this.findCommentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CommentResponse>): CommentResponse => r.body)
    );
  }

  /** Path part for operation `deleteById()` */
  static readonly DeleteByIdPath = '/comments/{comment-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById$Response(params: DeleteById$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById(params: DeleteById$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteById$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `findAllCommentByPost()` */
  static readonly FindAllCommentByPostPath = '/comments/post/{post-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCommentByPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCommentByPost$Response(params: FindAllCommentByPost$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCommentResponse>> {
    return findAllCommentByPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllCommentByPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCommentByPost(params: FindAllCommentByPost$Params, context?: HttpContext): Observable<PageResponseCommentResponse> {
    return this.findAllCommentByPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCommentResponse>): PageResponseCommentResponse => r.body)
    );
  }

}
