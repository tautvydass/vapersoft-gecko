import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/enums/role';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/services/refresh/refresh.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  loggedIn: boolean = true;

  isAdmin: boolean = false;
  isAdvisor: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private refreshService: RefreshService) { }

  ngOnInit() {
    this.userService.onLogin.subscribe(user => {
      this.user = user;
      this.loggedIn = true;
      this.isAdmin = (user.role.toString() === Role[Role.ADMIN]);
      this.isAdvisor = (user.role.toString() !== Role[Role.DEFAULT]);
    });

    this.userService.onLogout.subscribe(any => {
      this.user = null;
      this.loggedIn = false;
      this.isAdmin = false;
    });
    
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.loggedIn = true;
      this.isAdmin = (user.role.toString() === Role[Role.ADMIN]);
      this.isAdvisor = (user.role.toString() !== Role[Role.DEFAULT]);
    });
  }

  logout(): void {
    this.userService.logout();
  }

  goToCreateNewGroupTrip() {
    this.router.navigate(['main/create']);
  }

  goToMain(): void {
    if (this.userService.isLoggedIn()) {
      this.refreshService.onRefreshRequested.emit();
      this.router.navigate(['main']);
    }
  }

  goToAdmin(): void {
    this.router.navigate(['/main/manage']);
  }

  goToOrganisedTrips(): void {
    this.router.navigate(['/main/organised']);
  }
}
