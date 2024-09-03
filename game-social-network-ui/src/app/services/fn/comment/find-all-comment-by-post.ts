/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseCommentResponse } from '../../models/page-response-comment-response';

export interface FindAllCommentByPost$Params {
  'post-id': number;
  page?: number;
  size?: number;
}

export function findAllCommentByPost(http: HttpClient, rootUrl: string, params: FindAllCommentByPost$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCommentResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllCommentByPost.PATH, 'get');
  if (params) {
    rb.path('post-id', params['post-id'], {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseCommentResponse>;
    })
  );
}

findAllCommentByPost.PATH = '/comments/post/{post-id}';
