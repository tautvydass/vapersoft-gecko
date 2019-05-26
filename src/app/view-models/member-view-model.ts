import { User } from '../models/user';

export class MemberViewModel {
    index: number;
    selectedUser: User;
    isAvailable: boolean;
    users: User[];
    containsDetails: boolean;
}