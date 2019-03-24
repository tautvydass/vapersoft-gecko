import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Role } from '../../models/enums/role';
import { Observable, of } from 'rxjs';
import { HostService } from '../host/host.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  temporaryUser: User = {
    id: 1,
    fullname: 'Fullname Placeholder',
    email: 'Email Placeholder',
    role: Role.advisor
  }

  constructor(private hostService: HostService) { }

  getUser(): Observable<User> {
    return of(this.temporaryUser);
  }

  login(username, password): Observable<User> {
    return of(this.temporaryUser);
  }
}
