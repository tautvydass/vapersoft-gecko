import { Injectable, EventEmitter } from '@angular/core';
import { GroupTrip } from '../../models/group-trip';
import { Observable } from 'rxjs';
import { HostService } from '../host/host.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class GroupTripService {

  constructor(
    private httpClient: HttpClient,
    private hostService: HostService,
    private userService: UserService) { }

  getGroupTrips(): Observable<GroupTrip[]> {
    return Observable.create(observer => {
      this.httpClient.get<GroupTrip[]>(this.hostService.getHostServerUrl() + '/v1/group-trip')
        .subscribe(GroupTrips => {
          observer.next(GroupTrips);
          observer.complete();
        }, error => {
          if (error.status === 404) {
            observer.next(null);
            observer.complete();
          } else {
            observer.next(error);
            this.userService.logout();
            observer.complete();
          }
        });
    });
  }

  getGroupTrip(id: number): Observable<GroupTrip> {
    return Observable.create(observer => {
      this.httpClient.get<GroupTrip>(
        this.hostService.getHostServerUrl() + '/v1/group-trip/' + id.toString())
          .subscribe(groupTrip => {
            observer.next(groupTrip);
            observer.complete();
          }, error => {
            if (error.status === 404) {
              observer.next(null);
              observer.complete();
            } else {
              observer.next(error);
              this.userService.logout();
              observer.complete();
            }
          });
    });
  }

  createGroupTrip(groupTrip: GroupTrip): Observable<GroupTrip> {
    return Observable.create(observer => {
      this.httpClient.post<GroupTrip>(
        this.hostService.getHostServerUrl() + '/v1/group-trip', groupTrip)
          .subscribe(gt => {
            observer.next(gt);
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
