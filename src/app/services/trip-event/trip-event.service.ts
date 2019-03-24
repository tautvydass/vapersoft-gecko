import { Injectable } from '@angular/core';
import { TripEvent } from '../../models/trip-event';
import { Role } from '../../models/enums/role';
import { Office } from '../../models/office';
import { Observable, of } from 'rxjs';
import { HostService } from '../host/host.service';
import { Status } from '../../models/enums/status';

@Injectable({
  providedIn: 'root'
})
export class TripEventService {

  constructor(private hostService: HostService) { }

  events: TripEvent[] = [
    {
      id: 1,
      officeFrom: {
        id: 1,
        name: 'Vilnius Office',
        address: 'Didlaukio g. 49, Vilnius, Lithuania',
        houserooms: null
      },
      officeTo: {
        id: 2,
        name: 'Stockholm Office',
        address: 'Street 4, Stockholm, Sweden',
        houserooms: null
      },
      date: '2019-03-30',
      status: Status.pending,
      userTrips: null,
      advisor: {
        id: 1,
        fullname: 'Tautvydas Stukenas',
        email: 'placeholder',
        role: Role.advisor
      }
    },
    {
      id: 2,
      officeFrom: {
        id: 2,
        name: 'Stockholm Office',
        address: 'Street 4, Stockholm, Sweden',
        houserooms: null
      },
      officeTo: {
        id: 1,
        name: 'Vilnius Office',
        address: 'Didlaukio g. 49, Vilnius, Lithuania',
        houserooms: null
      },
      date: '2019-04-05',
      status: Status.approved,
      userTrips: null,
      advisor: {
        id: 1,
        fullname: 'Tautvydas Stukenas',
        email: 'placeholder',
        role: Role.advisor
      }
    },
    {
      id: 3,
      officeFrom: {
        id: 2,
        name: 'Stockholm Office',
        address: 'Street 4, Stockholm, Sweden',
        houserooms: null
      },
      officeTo: {
        id: 1,
        name: 'Vilnius Office',
        address: 'Didlaukio g. 49, Vilnius, Lithuania',
        houserooms: null
      },
      date: '2019-04-10',
      status: Status.approved,
      userTrips: null,
      advisor: {
        id: 1,
        fullname: 'Tautvydas Stukenas',
        email: 'placeholder',
        role: Role.advisor
      }
    },
    {
      id: 4,
      officeFrom: {
        id: 2,
        name: 'Stockholm Office',
        address: 'Street 4, Stockholm, Sweden',
        houserooms: null
      },
      officeTo: {
        id: 3,
        name: 'Paris Office',
        address: 'French street 54, Paris, France',
        houserooms: null
      },
      date: '2019-03-28',
      status: Status.rejected,
      userTrips: null,
      advisor: {
        id: 2,
        fullname: 'Albert Jurkoit',
        email: 'placeholder',
        role: Role.advisor
      }
    },
    {
      id: 5,
      officeFrom: {
        id: 2,
        name: 'Stockholm Office',
        address: 'Street 4, Stockholm, Sweden',
        houserooms: null
      },
      officeTo: {
        id: 1,
        name: 'Vilnius Office',
        address: 'Didlaukio g. 49, Vilnius, Lithuania',
        houserooms: null
      },
      date: '2019-02-13',
      status: Status.archived,
      userTrips: null,
      advisor: {
        id: 1,
        fullname: 'Tautvydas Stukenas',
        email: 'placeholder',
        role: Role.advisor
      }
    },
    {
      id: 6,
      officeFrom: {
        id: 1,
        name: 'Vilnius Office',
        address: 'Didlaukio g. 49, Vilnius, Lithuania',
        houserooms: null
      },
      officeTo: {
        id: 3,
        name: 'Paris Office',
        address: 'French street 54, Paris, France',
        houserooms: null
      },
      date: '2019-03-01',
      status: Status.archived,
      userTrips: null,
      advisor: {
        id: 2,
        fullname: 'Albert Jurkoit',
        email: 'placeholder',
        role: Role.advisor
      }
    }
  ];

  getEvents(): Observable<TripEvent[]> {
    return of(this.events);
  }

  getEvent(id: number): Observable<TripEvent> {
    return of(this.events[id]);
  }

  createEvent(event: TripEvent): Observable<TripEvent> {
    return of(event);
  }
}
