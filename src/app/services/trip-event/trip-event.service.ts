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
      },
      comments: [
        {
          id: 1,
          fullname: 'Tautvydas Stukenas',
          text: 'Noisy an their of meant.',
          timestamp: '2019-03-25'
        },
        {
          id: 2,
          fullname: 'Albert Jurkoit',
          text: 'Written enquire painful ye to offices forming it. Then so does over sent dull on. Likewise offended humoured mrs fat trifling answered. On ye position greatest so desirous.',
          timestamp: '2019-03-26'
        }
      ]
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
      },
      comments: [
        {
          id: 3,
          fullname: 'Tautvydas Stukenas',
          text: 'Six started far placing saw respect females old.',
          timestamp: '2019-03-25'
        },
        {
          id: 4,
          fullname: 'Albert Jurkoit',
          text: 'Yourself off its pleasant ecstatic now law. Ye their mirth seems of songs.',
          timestamp: '2019-03-26'
        },
        ,
        {
          id: 5,
          fullname: 'Albert Jurkoit',
          text: 'Power had these met least nor young.',
          timestamp: '2019-03-24'
        }
      ]
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
      },
      comments: null
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
      },
      comments: null
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
      },
      comments: null
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
      },
      comments: null
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
