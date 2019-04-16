import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../../models/user';
import { GlobalsService } from '../globals/globals.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService, private globalsService: GlobalsService) { }

  CURRENT_USER_KEY = "current-user";

  setCurrentUser(user: User): void {
    this.storageService.set(this.CURRENT_USER_KEY, user);
  }

  getCurrentUser(): User {
    return this.storageService.get(this.CURRENT_USER_KEY);
  }

  deleteCurrentUser(): void {
    this.storageService.remove(this.CURRENT_USER_KEY);
  }

  setAccessToken(token: string): void {
    this.storageService.set(this.globalsService.ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string {
    return this.storageService.get(this.globalsService.ACCESS_TOKEN_KEY);
  }

  deleteAccessToken(): void {
    this.storageService.remove(this.globalsService.ACCESS_TOKEN_KEY);
  }
}
