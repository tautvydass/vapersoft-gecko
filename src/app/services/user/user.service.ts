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
import { Period } from 'src/app/models/period';

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

  getCachedUser(): Observable<User> {
    let currentUser: User = this.localStorageService.getCurrentUser();
    if (currentUser) {
      return of(currentUser);
    } else {
      return this.getUser();
    }
  }

  getUser(): Observable<User> {
    return Observable.create(observer => {
      this.httpClient.get<User>(this.hostService.getHostServerUrl() + '/v1/user')
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

  getUsers(): Observable<User[]> {
    return Observable.create(observer => {
      this.httpClient.get<User[]>(this.hostService.getHostServerUrl() + '/v1/user/all')
        .subscribe(users => {
          observer.next(users);
          observer.complete();
        }, error => {
          switch(error.status) {
            case 401: this.logout();
            default: error.message = this.ERROR_INTERNAL_SERVER;
          }
          observer.next(error.message);
          observer.complete();
        });
    });
  }

  deleteUser(user: User): Observable<any> {
    return Observable.create(observer => {
      this.httpClient.delete<any>(this.hostService.getHostServerUrl() + '/v1/user/' + user.id.toString())
        .subscribe(result => {
          observer.next(result);
          observer.complete();
        }, error => {
          switch(error.status) {
            case 401: this.logout();
            default: error.message = this.ERROR_INTERNAL_SERVER;
          }
          observer.next(error.message);
          observer.complete();
        });
    });
  }

  login(username: string, password: string): Observable<User> {
    const md5 = new Md5();
    let encodedPassword = md5.appendStr(password).end().toString();

    return Observable.create(observer => {
      this.httpClient.post<User>(
        this.hostService.getHostServerUrl() + '/v1/user/login',
        { username: username, password: encodedPassword },
        { observe: 'response' }).subscribe(response => {
          this.localStorageService.setCurrentUser(response.body);
          this.localStorageService.setAccessToken(response.headers.get(this.globalsService.ACCESS_TOKEN_KEY));
          observer.next(response.body);
          this.onLogin.emit(response.body);
          observer.complete();
        }, error => {
          switch(error.status) {
            case 401:
            case 404: error.message = this.ERROR_INVALID_CREDENTIALS; break;
            default: error.message = this.ERROR_INTERNAL_SERVER;
          }
          observer.error(error.message);
          observer.complete();
        });
    });
  }

  checkUserAvailability(user: User, dateFrom: string, dateTo: string): Observable<Period[]> {
    return Observable.create(observer => {
      this.httpClient.get<User>(
        this.hostService.getHostServerUrl() + '/v1/user/' + user.id + '/availability',
        { params: { "from": dateFrom, "to": dateTo } }).subscribe(unavailabilityPeriods => {
          observer.next(unavailabilityPeriods);
        }, error => {
          switch(error.status) {
            case 401: this.logout(); break;
            case 404: error.message = this.ERROR_INVALID_CREDENTIALS; break;
            default: error.message = this.ERROR_INTERNAL_SERVER;
          }
          observer.error(error.message);
        }, () => {
          observer.complete();
        });
    });
  }

  registerUser(user: User, username: string, password: string): Observable<User> {
    const md5 = new Md5();
    let encodedPassword = md5.appendStr(password).end().toString();

    return Observable.create(observer => {
      this.httpClient.post<User>(
        this.hostService.getHostServerUrl() + '/v1/user',
        { 
          username: username,
          password: encodedPassword,
          fullname: user.fullname,
          email: user.email
        }).subscribe(newUser => {
          observer.next(newUser);
          observer.complete();
        }, error => {
          switch(error.status) {
            case 401: this.logout(); break;
            default: break;
          }
          observer.error(error.message);
        }, () => {
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
