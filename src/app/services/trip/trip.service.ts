import { Injectable, EventEmitter } from '@angular/core';
import { GroupTrip } from '../../models/group-trip';
import { Observable } from 'rxjs';
import { HostService } from '../host/host.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { IComment } from 'src/app/models/comment';
import { Trip } from 'src/app/models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(
    private httpClient: HttpClient,
    private hostService: HostService,
    private userService: UserService) { }

  confirmTrip(trip: Trip): Observable<Trip> {
    return Observable.create(observer => {
      this.httpClient.put<Trip>(
        this.hostService.getHostServerUrl() + '/v1/trip/' + trip.id.toString() + ':confirm', null)
          .subscribe(trip => {
            observer.next(trip);
          }, error => {
            if (error.status === 401) {
              this.userService.logout();
            } else {
              // TODO: handle other errors
            }
            observer.next(error.message);
          }, () => {
            observer.complete();
          });
    });
  }

  cancelTrip(trip: Trip): Observable<Trip> {
    return Observable.create(observer => {
      this.httpClient.put<Trip>(
        this.hostService.getHostServerUrl() + '/v1/trip/' + trip.id.toString() + ':cancel', null)
          .subscribe(trip => {
            observer.next(trip);
          }, error => {
            if (error.status === 401) {
              this.userService.logout();
            } else {
              // TODO: handle other errors
            }
            observer.next(error.message);
          }, () => {
            observer.complete();
          });
    });
  }

  restoreTrip(trip: Trip): Observable<Trip> {
    return Observable.create(observer => {
      this.httpClient.put<Trip>(
        this.hostService.getHostServerUrl() + '/v1/trip/' + trip.id.toString() + ':restore', null)
          .subscribe(trip => {
            observer.next(trip);
          }, error => {
            if (error.status === 401) {
              this.userService.logout();
            } else {
              // TODO: handle other errors
            }
            observer.next(error.message);
          }, () => {
            observer.complete();
          });
    });
  }
}
