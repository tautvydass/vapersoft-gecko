import { Component, OnInit, Input } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { GroupTrip } from 'src/app/models/group-trip';
import { GroupTripViewModel } from 'src/app/view-models/group-trip-view-model';

@Component({
  selector: 'member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  @Input()
  viewModel: GroupTripViewModel;

  @Input()
  userFullname: string;

  constructor() { }

  ngOnInit() {
  }

}
