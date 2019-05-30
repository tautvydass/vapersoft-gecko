import { Trip } from '../models/trip';
import { GroupTrip } from '../models/group-trip';
import { User } from '../models/user';

export interface GroupTripViewModel {
    currentUser: User;
    myTrip: Trip;
    groupTrip: GroupTrip;
    approvable: boolean;
}