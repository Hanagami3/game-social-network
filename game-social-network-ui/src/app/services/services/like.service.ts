/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteLikeById } from '../fn/like/delete-like-by-id';
import { DeleteLikeById$Params } from '../fn/like/delete-like-by-id';
import { getLikesCountByPost } from '../fn/like/get-likes-count-by-post';
import { GetLikesCountByPost$Params } from '../fn/like/get-likes-count-by-post';
import { saveLike } from '../fn/like/save-like';
import { SaveLike$Params } from '../fn/like/save-like';

@Injectable({ providedIn: 'root' })
export class LikeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveLike()` */
  static readonly SaveLikePath = '/likes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveLike()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLike$Response(params: SaveLike$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveLike(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveLike$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLike(params: SaveLike$Params, context?: HttpContext): Observable<number> {
    return this.saveLike$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getLikesCountByPost()` */
  static readonly GetLikesCountByPostPath = '/likes/like-count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLikesCountByPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLikesCountByPost$Response(params?: GetLikesCountByPost$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: number;
}>> {
    return getLikesCountByPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLikesCountByPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLikesCountByPost(params?: GetLikesCountByPost$Params, context?: HttpContext): Observable<{
[key: string]: number;
}> {
    return this.getLikesCountByPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: number;
}>): {
[key: string]: number;
} => r.body)
    );
  }

  /** Path part for operation `deleteLikeById()` */
  static readonly DeleteLikeByIdPath = '/likes/{like-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLikeById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLikeById$Response(params: DeleteLikeById$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteLikeById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteLikeById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLikeById(params: DeleteLikeById$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteLikeById$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
