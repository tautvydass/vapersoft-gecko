import { Component, OnInit, EventEmitter } from '@angular/core';
import { GroupTripService } from '../../services/group-trip/group-trip.service';
import { GroupTrip } from '../../models/group-trip';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/services/refresh/refresh.service';
import { GroupTripViewModel } from 'src/app/view-models/group-trip-view-model';

@Component({
  selector: 'event-list-view',
  templateUrl: './event-list-view.component.html',
  styleUrls: ['./event-list-view.component.css']
})
export class EventListViewComponent implements OnInit {

  loading: boolean = false;

  groupTrips: GroupTrip[];

  viewModels: GroupTripViewModel[];

  groupTripJustCreated: boolean = false;

  unconfirmedGroupTripCount: number = 0;

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
      this.createGroupTripViewModels();
    }, error => {
      // TODO: handle error
    }, () => {
      this.loading = false;
    });
  }

  createGroupTripViewModels(): void {
    this.userService.getCachedUser().subscribe(user => {
      this.viewModels = this.groupTrips.map(groupTrip => this.createGroupTripViewModel(user, groupTrip));
      this.unconfirmedGroupTripCount = this.viewModels.filter(viewModel => !viewModel.myTrip.confirmed && !viewModel.myTrip.requestedCancel).length;
    })
  }

  createGroupTripViewModel(user: User, groupTrip: GroupTrip): GroupTripViewModel {
      let viewModel: GroupTripViewModel = {
        currentUser: user,
        myTrip: groupTrip.userTrips.find(trip => trip.user.id === user.id),
        groupTrip: groupTrip,
        approvable: this.allTripsConfirmed(groupTrip)
      };
      return viewModel;
  }

  allTripsConfirmed(groupTrip: GroupTrip): boolean {
    for (var i = 0; i < groupTrip.userTrips.length; i++) {
      if (!groupTrip.userTrips[i].confirmed) return false;
    }
    return true;
  }

  sortByDate(groupTrip1: GroupTrip, groupTrip2: GroupTrip): number {
    return groupTrip1.dateFromNumber - groupTrip2.dateFromNumber;
  }

  emptyEvents(): boolean {
    return isNullOrUndefined(this.viewModels) || this.viewModels.length === 0;
  }

  closeAlert(): void {
    this.groupTripJustCreated = false;
  }

  closeInfoAlert(): void {
    this.unconfirmedGroupTripCount = 0;
  }
}
