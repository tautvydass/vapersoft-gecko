import { Office } from './office';
import { Trip } from './trip';
import { Status } from './enums/status';
import { User } from './user';
import { IComment } from './comment';

export interface TripEvent {
    id: number;
    officeFrom: Office;
    officeTo: Office;
    date: string;
    status: Status;
    userTrips: Trip[];
    advisor: User;
    comments: IComment[];
}