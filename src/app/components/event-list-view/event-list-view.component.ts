import { Component, OnInit } from '@angular/core';
import { TripEventService } from '../../services/trip-event/trip-event.service';
import { TripEvent } from '../../models/trip-event';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'event-list-view',
  templateUrl: './event-list-view.component.html',
  styleUrls: ['./event-list-view.component.css']
})
export class EventListViewComponent implements OnInit {

  events: TripEvent[];

  user: User;

  constructor(
    private eventService: TripEventService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        this.eventService.getEvents().subscribe((events: TripEvent[]) => {
          this.events = events;
        });
      });
  }

}
