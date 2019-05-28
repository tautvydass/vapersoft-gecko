import { User } from '../models/user';
import { Houseroom } from '../models/houseroom';
import { EventEmitter } from '@angular/core';

export class MemberViewModel {
    index: number;
    selectedUser: User;
    isAvailable: boolean;
    checkingAvailability: boolean;
    users: User[];
    houserooms: Houseroom[];
    selectedHouseroom: Houseroom;
    containsDetails: boolean;

    onSelectedHouseroomChanged: EventEmitter<Houseroom>;
}