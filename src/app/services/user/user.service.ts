import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Role } from '../../models/enums/role';
import { Observable, of } from 'rxjs';
import { HostService } from '../host/host.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { HeaderService } from '../header/header.service';
import { GlobalsService } from '../globals/globals.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private hostService: HostService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private httpClient: HttpClient,
    private headerService: HeaderService,
    private globalsService: GlobalsService) { }

  getUser(): Observable<User> {
    const localUser = this.localStorageService.getCurrentUser();
    if (isNullOrUndefined(localUser)) {
      this.httpClient.get<User>(this.hostService.getHostServerUrl() + 'user', { headers: this.headerService.getHeader() })
        .subscribe(user => {
          this.localStorageService.setCurrentUser(user);
          return user;
        }, error => {
          console.error('Error in getUser(): ' + error);
          this.redirectToLoginScreen();
        });
    } else {
      return of(localUser);
    }
  }

  login(username, password): Observable<User> {
    // TODO: encode password
    this.httpClient.post<any>(
      this.hostService.getHostServerUrl() + 'user/login',
      { username: username, password: password },
      { headers: this.headerService.getHeader() })
        .subscribe(response => {
          let user: User = <User>response.body;
          this.localStorageService.setCurrentUser(user);
          this.localStorageService.setAccessToken(response.headers.get(this.globalsService.BACKEND_ACCESS_TOKEN_KEY));
          return user;
        }, error => {
          console.log('Error in login(): ' + error);
          return null;
        });
    return null;
  }

  logout() {
    this.localStorageService.deleteCurrentUser();
    this.localStorageService.deleteAccessToken();
  }

  isLoggedIn(): boolean {
    const user = this.localStorageService.getCurrentUser();
    return !isNullOrUndefined(user);
  }

  redirectToLoginScreen(): void {
    this.router.navigate(['/']);
  }
}
