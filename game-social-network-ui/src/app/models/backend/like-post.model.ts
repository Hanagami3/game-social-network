import { User } from "./user.model";
import { Post } from "./post.model";

export interface LikePost{
    id: string;
    user: User;
    post: Post;
    createDate: string;
}