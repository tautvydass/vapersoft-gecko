import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  readonly ACCESS_TOKEN_KEY = 'Gecko-Access-Token';

  constructor() { }
}
