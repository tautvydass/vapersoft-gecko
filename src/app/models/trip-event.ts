import { Office } from './office';
import { Trip } from './trip';

export interface TripEvent {
    id: number;
    officeFrom: Office;
    officeTo: Office;
    date: string;
    status: Status;
    userTrips: Trip[];
}