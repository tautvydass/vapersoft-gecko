import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {Router} from "@angular/router"
import { Input } from "@angular/core";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  @Input() username: string;
  @Input() password: string;

  ngOnInit() {
  }

  onUsernameUpdated() {

  }

  onPasswordUpdated() {

  }

  login() {
    if (this.userService.login(this.username, this.password) != null) {
      this.router.navigate(['/main']);
    }
  }

  isValid(): boolean {
    return this.username != null && this.password != null;
  }

}
