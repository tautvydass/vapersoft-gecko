import { Component, OnInit } from '@angular/core';
import { GroupTripService } from '../../services/group-trip/group-trip.service';
import { GroupTrip } from '../../models/group-trip';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'event-list-view',
  templateUrl: './event-list-view.component.html',
  styleUrls: ['./event-list-view.component.css']
})
export class EventListViewComponent implements OnInit {

  groupTrips: GroupTrip[];

  user: User;

  constructor(
    private groupTripService: GroupTripService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        this.groupTripService.getEvents().subscribe((groupTrips: GroupTrip[]) => {
          this.groupTrips = groupTrips;
        });
      });
  }

  emptyEvents(): boolean {
    return isNullOrUndefined(this.groupTrips) || this.groupTrips.length === 0;
  }
}
