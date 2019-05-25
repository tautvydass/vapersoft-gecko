import { User } from '../models/user';

export class MemberViewModel {
    index: number;
    selectedUser: User;
    users: User[];
    containsDetails: boolean;
}