import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  loggedIn: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.onLogin.subscribe(user => {
      this.user = user;
      this.loggedIn = true;
    });

    this.userService.onLogout.subscribe(any => {
      this.user = null;
      this.loggedIn = false;
    });
    
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.loggedIn = true;
    });
  }

  logout(): void {
    this.userService.logout();
  }
}
