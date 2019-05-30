import { Component, OnInit } from '@angular/core';
import { GroupTrip } from 'src/app/models/group-trip';
import { GroupTripService } from 'src/app/services/group-trip/group-trip.service';
import { RefreshService } from 'src/app/services/refresh/refresh.service';
import { User } from 'src/app/models/user';
import { GroupTripViewModel } from 'src/app/view-models/group-trip-view-model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'organised-trips-list-view',
  templateUrl: './organised-trips-list-view.component.html',
  styleUrls: ['./organised-trips-list-view.component.css']
})
export class OrganisedTripsListViewComponent implements OnInit {

  loading: boolean = false;

  groupTrips: GroupTrip[];

  viewModels: GroupTripViewModel[];

  approvableGroupTripCount: number = 0;

  constructor(
    private userService: UserService,
    private groupTripService: GroupTripService,
    private refreshService: RefreshService) { }

  ngOnInit() {
    this.refreshService.onRefreshRequested.subscribe(() => this.refresh());
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.groupTripService.getOrganisedGroupTrips().subscribe(groupTrips => {
      this.groupTrips = groupTrips.sort((gt1, gt2) => this.sortByDate(gt1, gt2));
      this.userService.getCachedUser().subscribe(user => {
        this.viewModels = this.groupTrips.map(groupTrip => this.createGroupTripViewModel(groupTrip, user));
        this.approvableGroupTripCount = this.viewModels.filter(viewModel => viewModel.approvable).length;
        this.loading = false;
      });
    }, error => {
      // TODO: handle error
    }, () => {
      this.loading = false;
    });
  }

  createGroupTripViewModel(groupTrip: GroupTrip, user: User): GroupTripViewModel {
    let viewModel: GroupTripViewModel = {
      myTrip: null,
      groupTrip: groupTrip,
      currentUser: user,
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
    return groupTrip1.date - groupTrip2.date;
  }

  closeAlert(): void {
    
  }

}
