import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Role } from '../../models/enums/role';
import { Observable, of } from 'rxjs';
import { HostService } from '../host/host.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly TEST_USERNAME = "test";
  readonly TEST_PASSWORD = "111111"

  currentUser: User = null;

  constructor(private hostService: HostService, private router: Router) { }

  validateCurrentUser() {
    if (isNullOrUndefined(this.currentUser)) {
      this.router.navigate(['/']);
    }
  }

  getUser(): Observable<User> {
    return of(this.currentUser);
  }

  login(username, password): Observable<User> {
    if (username === this.TEST_USERNAME && password === this.TEST_PASSWORD) {
      this.currentUser = {
        id: 1,
        fullname: 'Fullname Placeholder',
        email: 'Email Placeholder',
        role: Role.advisor
      };
      return of(this.currentUser);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !isNullOrUndefined(this.currentUser);
  }
}
