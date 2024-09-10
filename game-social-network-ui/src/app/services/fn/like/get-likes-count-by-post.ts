/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetLikesCountByPost$Params {
}

export function getLikesCountByPost(http: HttpClient, rootUrl: string, params?: GetLikesCountByPost$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: number;
}>> {
  const rb = new RequestBuilder(rootUrl, getLikesCountByPost.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      [key: string]: number;
      }>;
    })
  );
}

getLikesCountByPost.PATH = '/likes/like-count';
