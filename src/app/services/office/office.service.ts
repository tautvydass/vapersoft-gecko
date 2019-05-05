import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Office } from 'src/app/models/office';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from '../globals/globals.service';
import { HostService } from '../host/host.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(
    private hostService: HostService,
    private localStorageService: LocalStorageService,
    private httpClient: HttpClient,
    private globalsService: GlobalsService ) { }

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

}
