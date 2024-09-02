import { User } from "./user.model";
import { Comment } from "@angular/compiler";

export interface LikeComment{
    id: string;
    user: User;
    comment: Comment;
    createDate: string;
}