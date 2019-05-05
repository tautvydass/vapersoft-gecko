import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Role } from '../../models/enums/role';
import { Observable, of } from 'rxjs';
import { HostService } from '../host/host.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from '../globals/globals.service';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  onLogin: EventEmitter<User> = new EventEmitter();
  onLogout: EventEmitter<any> = new EventEmitter();

  readonly ERROR_INVALID_CREDENTIALS: string = "invalid username or password";
  readonly ERROR_INTERNAL_SERVER: string = "service unavailable";

  constructor(
    private hostService: HostService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private httpClient: HttpClient,
    private globalsService: GlobalsService) { }

  getUser(): Observable<User> {
    return Observable.create(observer => {
      this.httpClient.get<User>(this.hostService.getHostServerUrl() + 'v1/user')
        .subscribe(user => {
          this.localStorageService.setCurrentUser(user);
          observer.next(user);
          observer.complete();
        }, error => {
          observer.next(error);
          this.logout();
          observer.complete();
        });
    });
  }

  login(username: string, password: string): Observable<User> {
    const md5 = new Md5();
    let encodedPassword = md5.appendStr(password).end().toString();

    return Observable.create(observer => {
      this.httpClient.post<User>(
        this.hostService.getHostServerUrl() + 'v1/user/login',
        { username: username, password: encodedPassword },
        { observe: 'response' }).subscribe(response => {
          this.localStorageService.setCurrentUser(response.body);
          this.localStorageService.setAccessToken(response.headers.get(this.globalsService.ACCESS_TOKEN_KEY));
          observer.next(response.body);
          this.onLogin.emit(response.body);
          observer.complete();
        }, error => {
          switch(error.status) {
            case 401: error.message = this.ERROR_INVALID_CREDENTIALS; break;
            default: error.message = this.ERROR_INTERNAL_SERVER;
          }
          observer.error(error);
          observer.complete();
        });
    });
  }

  logout() {
    this.localStorageService.deleteCurrentUser();
    this.localStorageService.deleteAccessToken();
    this.router.navigate(['/']);
    this.onLogout.emit(null);
  }

  isLoggedIn(): boolean {
    const user = this.localStorageService.getCurrentUser();
    return !isNullOrUndefined(user);
  }
}
