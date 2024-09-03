/* tslint:disable */
/* eslint-disable */
import { CommentResponse } from '../models/comment-response';
export interface PageResponseCommentResponse {
  content?: Array<CommentResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
