import { Component, OnInit, Input } from '@angular/core';
import { GroupTrip } from 'src/app/models/group-trip';
import { DateFormatterService } from 'src/app/services/date-formatter.service';
import { GroupTripViewModel } from 'src/app/view-models/group-trip-view-model';
import { Router } from '@angular/router';

@Component({
  selector: 'organised-group-trip-view',
  templateUrl: './organised-group-trip-view.component.html',
  styleUrls: ['./organised-group-trip-view.component.css']
})
export class OrganisedGroupTripViewComponent implements OnInit {

  @Input()
  viewModel: GroupTripViewModel;

  dateFrom: string;
  dateTo: string;

  members: string = null;

  approvable: boolean = false;

  loading: boolean = false;

  constructor(
    private dateFormatter: DateFormatterService,
    private router: Router) { }

  ngOnInit() {
    this.dateFrom = this.dateFormatter.formatDate(this.viewModel.groupTrip.dateFrom);
    this.dateTo = this.dateFormatter.formatDate(this.viewModel.groupTrip.dateTo);
    this.members = this.viewModel.groupTrip.userTrips.map(trip => trip.user.fullname).join(", ");
  }

  edit(): void {
    this.router.navigate(['/main/organised/edit/' + this.viewModel.groupTrip.id.toString()]);
  }

  approve(): void {

  }

}
