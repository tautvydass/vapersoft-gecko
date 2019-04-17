import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Role } from '../../models/enums/role';
import { Observable, of, throwError } from 'rxjs';
import { HostService } from '../host/host.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { GlobalsService } from '../globals/globals.service';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private hostService: HostService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private httpClient: HttpClient,
    private globalsService: GlobalsService) { }

  getUser(): Observable<User> {
    const localUser = this.localStorageService.getCurrentUser();
    if (isNullOrUndefined(localUser)) {
      return Observable.create(observer => {
        this.httpClient.get<User>(this.hostService.getHostServerUrl() + 'user')
          .subscribe(user => {
            this.localStorageService.setCurrentUser(user);
            observer.next(user);
          }, error => {
            observer.next(error);
            this.redirectToLoginScreen();
          }, () => {
            observer.complete();
          });
      });
    } else {
      return of(localUser);
    }
  }

  login(username: string, password: string): Observable<User> {
    const md5 = new Md5();
    let encodedPassword = md5.appendStr(password).end().toString();

    return Observable.create(observer => {
      this.httpClient.post<User>(
        this.hostService.getHostServerUrl() + 'user/login',
        { username: username, password: encodedPassword },
        { observe: 'response' }).subscribe(response => {
          this.localStorageService.setCurrentUser(response.body);
          console.log('HEADERS: ' + response.headers.keys());
          this.localStorageService.setAccessToken(response.headers.get(this.globalsService.BACKEND_ACCESS_TOKEN_KEY));
          observer.next(response.body);
        }, error => {
          observer.error(error);
        }, () => {
          observer.complete();
        });
    });
  }

  logout() {
    this.localStorageService.deleteCurrentUser();
    this.localStorageService.deleteAccessToken();
    this.redirectToLoginScreen();
  }

  isLoggedIn(): boolean {
    const user = this.localStorageService.getCurrentUser();
    return !isNullOrUndefined(user);
  }

  redirectToLoginScreen(): void {
    this.router.navigate(['/']);
  }
}
