import { User } from './user';

export interface IComment {
    id: number;
    user: User;
    text: string;
    timestamp: string;
}