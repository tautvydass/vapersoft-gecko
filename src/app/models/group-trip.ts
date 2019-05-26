import { Office } from './office';
import { Trip } from './trip';
import { Status } from './enums/status';
import { User } from './user';
import { IComment } from './comment';

export interface GroupTrip {
    id: number;
    officeFrom: Office;
    officeTo: Office;
    dateFrom: string;
    dateTo: string;
    status: string;
    userTrips: Trip[];
    advisor: User;
    comments: IComment[];
}