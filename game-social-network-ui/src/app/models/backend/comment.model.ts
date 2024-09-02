import { User } from "./user.model";
import { Post } from "./post.model";
import { LikeComment } from "./like-comment.model";

export interface Comment{
    id: string;
    content: string;
    user: User;
    post: Post;
    likeComments: LikeComment[];
    createDate: string;
    updateDate: string;
}