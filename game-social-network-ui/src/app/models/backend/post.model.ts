import { User } from "./user.model";
import { Comment } from "@angular/compiler";
import { LikePost } from "./like-post.model";

export interface Post{
    id: string;
    title: string;
    resume: string;
    content: string;
    user: User;
    comments: Comment[];
    likePost: LikePost[];
    createDate: string;
    updateDate: string
}