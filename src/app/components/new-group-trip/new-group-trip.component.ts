import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Office } from 'src/app/models/office';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'new-group-trip',
  templateUrl: './new-group-trip.component.html',
  styleUrls: ['./new-group-trip.component.css']
})
export class NewGroupTripComponent implements OnInit {

  loading: boolean = true;

  users: User[];

  offices: Office[];

  members: User[];

  isFormValid: boolean;

  constructor(
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    }, error => {
      console.log(error.message);
    }, () => {
      this.loading = false;
    })
    // TODO: get office services
  }

}
