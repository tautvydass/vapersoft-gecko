import { Component, OnInit } from '@angular/core';
import { GroupTripService } from '../../services/group-trip/group-trip.service';
import { GroupTrip } from '../../models/group-trip';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'event-list-view',
  templateUrl: './event-list-view.component.html',
  styleUrls: ['./event-list-view.component.css']
})
export class EventListViewComponent implements OnInit {

  loading: boolean = true;

  groupTrips: GroupTrip[];

  user: User;

  constructor(
    private groupTripService: GroupTripService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.groupTripService.getGroupTrips().subscribe(groupTrips => {
      this.groupTrips = groupTrips;
    }, error => {
      // TODO: handle error
    }, () => {
      this.loading = false;
    })
  }

  emptyEvents(): boolean {
    return isNullOrUndefined(this.groupTrips) || this.groupTrips.length === 0;
  }
}
