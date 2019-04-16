import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  readonly ACCESS_TOKEN_KEY = "gecko-access-token";
  readonly BACKEND_ACCESS_TOKEN_KEY = "Authorization";

  constructor() { }
}
