import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  hostServerUrl = 'https://vapersoft-gecko.firebaseapp.com/';

  constructor() { }

  getHostServerUrl(): string {
    return this.hostServerUrl;
  }
}
