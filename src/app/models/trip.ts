import { TripDocument } from './trip-document';
import { GroupTrip } from './group-trip';
import { Houseroom } from './houseroom';
import { User } from './user';

export interface Trip {
    id: number;
    user: User;
    documents: TripDocument[];
    houserooms: Houseroom[];
    tripInfo: GroupTrip;
}