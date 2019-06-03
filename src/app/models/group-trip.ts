import { Office } from './office';
import { Trip } from './trip';
import { User } from './user';
import { IComment } from './comment';

export interface GroupTrip {
    id: number;
    title: string;
    officeFrom: Office;
    officeTo: Office;
    dateFrom: string;
    dateTo: string;
    status: string;
    userTrips: Trip[];
    advisor: User;
    comments: IComment[];
    dateFromNumber: number;
    dateToNumber: number;
    transportRequired: boolean;
    accommodationRequired: boolean;
    carRentRequired: boolean;
}