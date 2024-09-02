import { Post } from "./post.model";
import { Comment } from "@angular/compiler";
import { LikePost } from "./like-post.model";
import { LikeComment } from "./like-comment.model";

export interface User{
    id: string;
    username: string;
    email: string;
    posts: Post[];
    comments: Comment[];
    likePost: LikePost[];
    likeComment: LikeComment[]
    createDate: string;
}