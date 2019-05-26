import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  readonly BACKEND_URL = 'https://psk-backend.herokuapp.com';

  constructor() { }

  getHostServerUrl(): string {
    return this.BACKEND_URL;
  }
}
