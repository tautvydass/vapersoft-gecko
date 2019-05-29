import { Component, OnInit, Input } from '@angular/core';
import { GroupTrip } from 'src/app/models/group-trip';
import { Trip } from 'src/app/models/trip';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  @Input()
  groupTrip: GroupTrip;

  trip: Trip;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // TODO: what about advisor
    this.userService.getCachedUser().subscribe(user => {
      this.trip = this.groupTrip.userTrips.find(t => t.user.id === user.id);
    })
  }

}
