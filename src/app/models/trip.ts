import { TripDocument } from './trip-document';
import { GroupTrip } from './group-trip';
import { Houseroom } from './houseroom';
import { Status } from './enums/status';

export interface Trip {
    id: number;
    userId: number;
    status: Status;
    documents: TripDocument[];
    houserooms: Houseroom[];
    tripInfo: GroupTrip;
}