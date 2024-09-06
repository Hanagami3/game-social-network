/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAllPostByAuthor } from '../fn/post/find-all-post-by-author';
import { FindAllPostByAuthor$Params } from '../fn/post/find-all-post-by-author';
import { findAllPosts } from '../fn/post/find-all-posts';
import { FindAllPosts$Params } from '../fn/post/find-all-posts';
import { findPostById } from '../fn/post/find-post-by-id';
import { FindPostById$Params } from '../fn/post/find-post-by-id';
import { PageResponsePostResponse } from '../models/page-response-post-response';
import { PostResponse } from '../models/post-response';
import { savePost } from '../fn/post/save-post';
import { SavePost$Params } from '../fn/post/save-post';
import { updateArchivedStatus } from '../fn/post/update-archived-status';
import { UpdateArchivedStatus$Params } from '../fn/post/update-archived-status';
import { updateShareableStatus } from '../fn/post/update-shareable-status';
import { UpdateShareableStatus$Params } from '../fn/post/update-shareable-status';
import { uploadImage } from '../fn/post/upload-image';
import { UploadImage$Params } from '../fn/post/upload-image';

@Injectable({ providedIn: 'root' })
export class PostService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllPosts()` */
  static readonly FindAllPostsPath = '/posts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPosts()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPosts$Response(params?: FindAllPosts$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePostResponse>> {
    return findAllPosts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllPosts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPosts(params?: FindAllPosts$Params, context?: HttpContext): Observable<PageResponsePostResponse> {
    return this.findAllPosts$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponsePostResponse>): PageResponsePostResponse => r.body)
    );
  }

  /** Path part for operation `savePost()` */
  static readonly SavePostPath = '/posts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `savePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePost$Response(params: SavePost$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return savePost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `savePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePost(params: SavePost$Params, context?: HttpContext): Observable<number> {
    return this.savePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadImage()` */
  static readonly UploadImagePath = '/posts/image/{post-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadImage()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadImage$Response(params: UploadImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadImage$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadImage(params: UploadImage$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `updateShareableStatus()` */
  static readonly UpdateShareableStatusPath = '/posts/shareable/{post-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateShareableStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus$Response(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateShareableStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateShareableStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateShareableStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateArchivedStatus()` */
  static readonly UpdateArchivedStatusPath = '/posts/archived/{post-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArchivedStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus$Response(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateArchivedStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArchivedStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateArchivedStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findPostById()` */
  static readonly FindPostByIdPath = '/posts/{post-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPostById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPostById$Response(params: FindPostById$Params, context?: HttpContext): Observable<StrictHttpResponse<PostResponse>> {
    return findPostById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPostById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPostById(params: FindPostById$Params, context?: HttpContext): Observable<PostResponse> {
    return this.findPostById$Response(params, context).pipe(
      map((r: StrictHttpResponse<PostResponse>): PostResponse => r.body)
    );
  }

  /** Path part for operation `findAllPostByAuthor()` */
  static readonly FindAllPostByAuthorPath = '/posts/author';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPostByAuthor()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPostByAuthor$Response(params?: FindAllPostByAuthor$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePostResponse>> {
    return findAllPostByAuthor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllPostByAuthor$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPostByAuthor(params?: FindAllPostByAuthor$Params, context?: HttpContext): Observable<PageResponsePostResponse> {
    return this.findAllPostByAuthor$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponsePostResponse>): PageResponsePostResponse => r.body)
    );
  }

}
