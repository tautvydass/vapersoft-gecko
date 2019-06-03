import { GroupTrip } from '../models/group-trip';
import { EventEmitter } from '@angular/core';

export class JoinTripViewModel {
    groupTrip: GroupTrip;
    groupTrips: GroupTrip[];
    onGroupTripJoined: EventEmitter<string>;
}
