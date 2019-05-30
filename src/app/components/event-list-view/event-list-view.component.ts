import { Component, OnInit } from '@angular/core';
import { GroupTripService } from '../../services/group-trip/group-trip.service';
import { GroupTrip } from '../../models/group-trip';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/services/refresh/refresh.service';

@Component({
  selector: 'event-list-view',
  templateUrl: './event-list-view.component.html',
  styleUrls: ['./event-list-view.component.css']
})
export class EventListViewComponent implements OnInit {

  loading: boolean = false;

  groupTrips: GroupTrip[];

  user: User;

  groupTripJustCreated: boolean = false;

  constructor(
    private groupTripService: GroupTripService,
    private userService: UserService,
    private router: Router,
    private refreshService: RefreshService) { }

  ngOnInit() {
    this.refreshService.onRefreshRequested.subscribe(() => this.refresh());
    this.refresh();
    this.groupTripJustCreated = this.groupTripService.wasGroupTripCreated();
  }

  refresh(): void {
    this.loading = true;
    this.groupTripService.getGroupTrips().subscribe(groupTrips => {
      this.groupTrips = groupTrips.sort((gt1, gt2) => this.sortByDate(gt1, gt2));
    }, error => {
      // TODO: handle error
    }, () => {
      this.loading = false;
    });
  }

  sortByDate(groupTrip1: GroupTrip, groupTrip2: GroupTrip): number {
    return groupTrip1.date - groupTrip2.date;
  }

  emptyEvents(): boolean {
    return isNullOrUndefined(this.groupTrips) || this.groupTrips.length === 0;
  }

  closeAlert(): void {
    this.groupTripJustCreated = false;
  }
}
