import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Office } from 'src/app/models/office';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { HostService } from '../host/host.service';
//import { Houseroom } from 'src/app/models/houseroom';


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
        this.httpClient.get<Office[]>(this.hostService.getHostServerUrl() + 'v1/office', 
        { headers: {"Gecko-Access-Token":this.localStorageService.getAccessToken()}})
          .subscribe(offices => {
            observer.next(offices);
            observer.complete();
          }, error => {
            observer.next(error);
            observer.complete();
          });
      });
    }

    getOffice(id: number): Observable<Office> {
      return Observable.create(observer => {
        this.httpClient.get<Office>(this.hostService.getHostServerUrl() + 'v1/office/' + id.toString(), 
        { headers: {"Gecko-Access-Token" : this.localStorageService.getAccessToken()}})
          .subscribe(office => {
            observer.next(office);
            observer.complete();
          }, error => {
            observer.next(error);
            observer.complete();
          });
      });
    }

    // TODO - add proper implementation, right now /hoseroom/availability is not found. 
    /*getAvailableHouserooms(id: number, from: string, to: string): Observable<Houseroom[]> {
      return Observable.create(observer => {
        this.httpClient.get<Houseroom[]>(this.hostService.getHostServerUrl() + 'v1/office/' + id.toString() + '/houseroom/availability', 
        { headers: {"Gecko-Access-Token" : this.localStorageService.getAccessToken()}})
          .subscribe(office => {
            observer.next(office);
            observer.complete();
          }, error => {
            observer.next(error);
            observer.complete();
          });
      });
    }*/
    // Uncomment and TEST!!! once this is implemented in backend
   /* createNewOffice(office: Office): Observable<Office> {
      return Observable.create(observer => {
        this.httpClient.post<Office>(
          this.hostService.getHostServerUrl() + 'v1/office', office, 
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
    }*/

}
