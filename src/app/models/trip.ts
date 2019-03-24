import { TripDocument } from './trip-document';
import { TripEvent } from './trip-event';
import { Houseroom } from './houseroom';

export interface Trip {
    id: number;
    userId: number;
    status: Status;
    documents: TripDocument[];
    houserooms: Houseroom[];
    tripInfo: TripEvent;
}