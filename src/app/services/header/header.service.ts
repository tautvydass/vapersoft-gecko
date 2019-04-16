import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { GlobalsService } from '../globals/globals.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  headers: HttpHeaders;

  constructor(private localStorageService: LocalStorageService, private globalsService: GlobalsService) { }

  getHeader(): HttpHeaders {
    if (isNullOrUndefined(this.headers)) {
      this.headers = new HttpHeaders()
        .set(this.globalsService.BACKEND_ACCESS_TOKEN_KEY, this.localStorageService.getAccessToken())
        .set('Content-Type', 'application/json');
    }
    return this.headers;
  }
}
