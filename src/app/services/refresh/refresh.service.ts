import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  onRefreshRequested: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
