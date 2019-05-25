import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Office } from 'src/app/models/office';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { HostService } from '../host/host.service';
import { Houseroom } from 'src/app/models/houseroom';
import { Period } from 'src/app/models/period';


@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  onOfficeCreated: EventEmitter<Office> = new EventEmitter();

  constructor(
    private hostService: HostService,
    private localStorageService: LocalStorageService,
    private httpClient: HttpClient,
    private userService: UserService ) { }

    getOffices(): Observable<Office[]> {
      return Observable.create(observer => {
        this.httpClient.get<Office[]>(this.hostService.getHostServerUrl() + '/v1/office')
          .subscribe(offices => {
            observer.next(offices);
            observer.complete();
          }, error => {
            if (error.status === 401) {
              this.userService.logout();
            } 
            observer.next(error);
            observer.complete();
          });
      });
    }

    getOffice(officeId: number): Observable<Office> {
      return Observable.create(observer => {
        this.httpClient.get<Office>(this.hostService.getHostServerUrl() + '/v1/office/' + officeId.toString())
          .subscribe(office => {
            observer.next(office);
            observer.complete();
          }, error => {
            if (error.status === 401) {
              this.userService.logout();
            }
            observer.next(error);
            observer.complete();
          });
      });
    }

    getHouseroomsUnavailabilityPeriods(officeId: number, houseRoomId: number, fromDate: string, toDate: string): Observable<Period[]> {
      return Observable.create(observer => {
        this.httpClient.get<Period[]>(this.hostService.getHostServerUrl() + '/v1/office/' + officeId.toString() + 
        '/houseroom/' + houseRoomId.toString() + '/availability',{
          params: {
            "from": fromDate,
            "to": toDate
          }
        })
          .subscribe(periods => {
            observer.next(periods);
            observer.complete();
          }, error => {
            if (error.status === 401) {
              this.userService.logout();
              observer.next(error);
            } else if (error.status === 404) {
              observer.next([]);
            }
            observer.complete();
          });
      });
    }

    getAvailableHouserooms(officeId: number, fromDate: string, toDate: string): Observable<Houseroom[]> {
      return Observable.create(observer => {
        this.httpClient.get<Houseroom[]>(this.hostService.getHostServerUrl() + '/v1/office/' + officeId.toString() + '/houseroom/availability', {
          params: {
            "from": fromDate,
            "to": toDate
          }
        })
          .subscribe(office => {
            observer.next(office);
            observer.complete();
          }, error => {
            if (error.status === 401) {
              this.userService.logout();
              observer.next(error);
            } else if (error.status === 404) {
              observer.next([]);
            }
            observer.complete();
          });
      });
    }

    createNewOffice(office: Office): Observable<Office> {
      return Observable.create(observer => {
        this.httpClient.post<Office>(
          this.hostService.getHostServerUrl() + '/v1/office', office, 
          { headers: {"Gecko-Access-Token" : this.localStorageService.getAccessToken()}})
            .subscribe(newOffice => {
              observer.next(newOffice);
              this.onOfficeCreated.emit(newOffice);
              observer.complete();
            }, error => {
              if (error.status === 401) {
                this.userService.logout();
              } 
              observer.next(error.message);
              observer.complete();
            });
      });
    }
}
