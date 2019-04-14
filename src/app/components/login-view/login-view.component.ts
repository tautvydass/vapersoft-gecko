import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {Router} from "@angular/router"
import { Input } from "@angular/core";
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  readonly INVALID_CREDENTIALS_ERROR = "invalid username or password";

  @ViewChild('passwordinput') passwordInputElement: ElementRef;

  username: string;
  password: string;

  showError: boolean;
  errorMessage: string;

  canLogin: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (!this.canLogin) return;
    if (this.userService.login(this.username, this.password) != null) {
      this.showError = false;
      this.router.navigate(['/main']);
    } else {
      this.errorMessage = this.INVALID_CREDENTIALS_ERROR;
      this.showError = true;
      this.passwordInputElement.nativeElement.focus();
      this.passwordInputElement.nativeElement.select();
    }
  }

  onUsernameKey(event: any) {
    this.username = event.target.value;
    this.updateLoginButton();
  }

  onPasswordKey(event: any) {
    this.password = event.target.value;
    this.updateLoginButton();
  }

  updateLoginButton() {
    this.canLogin = this.validateUsername() && this.validatePassword();
  }

  validateUsername(): boolean {
    return !isNullOrUndefined(this.username) && this.username.length > 0;
  }

  validatePassword(): boolean {
    return !isNullOrUndefined(this.password) && this.password.length > 5;
  }
}
