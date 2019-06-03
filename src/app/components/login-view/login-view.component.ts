import { Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from "@angular/router"
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

  showError: boolean = false;
  errorMessage: string;

  canLogin: boolean = false;
  loggingIn: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.goToMainScreen();
    }

    this.updateLoginButton();
  }

  login() {
    if (!this.canLogin || this.loggingIn) return;
    this.loggingIn = true;

    this.userService.login(this.username, this.password).subscribe(user => {
      this.goToMainScreen();
      this.loggingIn = false;
    }, error => {
      // TODO: show message based on returned error code
      this.errorMessage = error;
      this.showError = true;
      this.passwordInputElement.nativeElement.focus();
      this.passwordInputElement.nativeElement.select();
      this.loggingIn = false;
    });
  }

  goToMainScreen() {
    this.showError = false;
    this.router.navigate(['/main']);
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
