import { User } from '../models/user';
import { IComment } from '../models/comment';

export interface CommentViewModel {
    groupTripId: number;
    comments: IComment[];
}