import { Injectable, EventEmitter } from '@angular/core';
import { GroupTrip } from '../../models/group-trip';
import { Observable } from 'rxjs';
import { HostService } from '../host/host.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { IComment } from 'src/app/models/comment';

@Injectable({
  providedIn: 'root'
})
export class GroupTripService {

  groupTripCreated: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private hostService: HostService,
    private userService: UserService) { }

  wasGroupTripCreated(): boolean {
    if (this.groupTripCreated) {
      this.groupTripCreated = false;
      return true;
    }
    return false;
  }

  getGroupTrips(): Observable<GroupTrip[]> {
    return Observable.create(observer => {
      this.httpClient.get<GroupTrip[]>(this.hostService.getHostServerUrl() + '/v1/group-trip')
        .subscribe(groupTrips => {
          groupTrips.forEach(groupTrip => {
            var values: number[] = groupTrip.dateFrom.split("-").map(value => +value);
            groupTrip.date = values[0] * 365 + values[1] * 30 + values[2];
          });
          observer.next(groupTrips);
          observer.complete();
        }, error => {
          if (error.status === 401) {
            observer.next(error.message);
            this.userService.logout();
          }
          else if (error.status === 404) {
            observer.next([]);
          } else {
            observer.next(error.message);
          }
          observer.complete();
        });
    });
  }

  getOrganisedGroupTrips(): Observable<GroupTrip[]> {
    return Observable.create(observer => {
      this.httpClient.get<GroupTrip[]>(this.hostService.getHostServerUrl() + '/v1/group-trip/organised')
        .subscribe(groupTrips => {
          groupTrips.forEach(groupTrip => {
            var values: number[] = groupTrip.dateFrom.split("-").map(value => +value);
            groupTrip.date = values[0] * 365 + values[1] * 30 + values[2];
          });
          observer.next(groupTrips);
          observer.complete();
        }, error => {
          if (error.status === 401) {
            observer.next(error.message);
            this.userService.logout();
          }
          else if (error.status === 404) {
            observer.next([]);
          } else {
            observer.next(error.message);
          }
          observer.complete();
        });
    });
  }

  getGroupTrip(id: number): Observable<GroupTrip> {
    return Observable.create(observer => {
      this.httpClient.get<GroupTrip>(
        this.hostService.getHostServerUrl() + '/v1/group-trip/' + id.toString())
          .subscribe(groupTrip => {
            var values: number[] = groupTrip.dateFrom.split("-").map(value => +value);
            groupTrip.date = values[0] * 365 + values[1] * 30 + values[2];
            observer.next(groupTrip);
            observer.complete();
          }, error => {
            if (error.status === 401) {
              observer.next(error.message);
              this.userService.logout();
            }
            else if (error.status === 404) {
              observer.next(null);
            } else {
              observer.next(error.message);
            }
            observer.complete();
          });
    });
  }

  createGroupTrip(groupTrip: GroupTrip): Observable<GroupTrip> {
    return Observable.create(observer => {
      this.httpClient.post<GroupTrip>(
        this.hostService.getHostServerUrl() + '/v1/group-trip', groupTrip)
          .subscribe(gt => {
            observer.next(gt);
            this.groupTripCreated = true;
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

  addComment(id: number, comment: IComment): Observable<IComment> {
    return Observable.create(observer => {
      this.httpClient.post<IComment>(
        this.hostService.getHostServerUrl() + '/v1/group-trip/' + id + '/comment', comment)
          .subscribe(c => {
            observer.next(c);
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
