import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  temporaryUser: User = {
    id: 1,
    fullname: 'Fullname Placeholder',
    email: 'Email Placeholder',
    role: 'default'
  }

  constructor() { }

  getUser(): Observable<User> {
    return of(this.temporaryUser);
  }

  login(username, password): Observable<User> {
    return of(this.temporaryUser);
  }
}
