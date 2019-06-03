import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Role } from 'src/app/models/enums/role';
import { User } from 'src/app/models/user';

@Component({
  selector: 'manage-view',
  templateUrl: './manage-view.component.html',
  styleUrls: ['./manage-view.component.css']
})
export class ManageViewComponent implements OnInit {

  loadingAdmin: boolean = false;

  userWasJustRemoved: boolean = false;
  removedUserFullname: string = null;

  userWasJustCreated: boolean = false;
  newUserFullname: string = null;

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.loadingAdmin = true;
    this.userService.getCachedUser().subscribe(user => {
      if (!user || user.role.toString() !== Role[Role.ADMIN]) {
        this.router.navigate(['/main']);
      }
    }, error => {
      this.router.navigate(['/main']);
    }, () => {
      this.loadingAdmin = false;
    });
  }

  onUserRemoved(userFullName: string): void {
    this.userWasJustRemoved = true;
    this.removedUserFullname = userFullName;
  }

  closeUserRemovedAlert(): void {
    this.userWasJustRemoved = false;
  }

  showUserCreatedDialog(user: User): void {
    this.newUserFullname = user.fullname;
    this.userWasJustCreated = true;
  }

  closeUserCreatedAlert(): void {
    this.userWasJustCreated = false;
  }

}
