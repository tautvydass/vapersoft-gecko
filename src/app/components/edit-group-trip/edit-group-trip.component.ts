import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupTripService } from 'src/app/services/group-trip/group-trip.service';
import { GroupTrip } from 'src/app/models/group-trip';

@Component({
  selector: 'edit-group-trip',
  templateUrl: './edit-group-trip.component.html',
  styleUrls: ['./edit-group-trip.component.css']
})
export class EditGroupTripComponent implements OnInit {

  groupTripId: number = null;

  groupTrip: GroupTrip;

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupTripService: GroupTripService) { 
      this.groupTripId = route.snapshot.params['id'];
    }

  ngOnInit() {
    if (!this.groupTripId || this.groupTripId < 1) {
      this.goBack();
    }
    this.loading = true;
    this.groupTripService.getGroupTrip(this.groupTripId).subscribe(groupTrip => {
      if (groupTrip == null) {
        this.goBack();
      } else {
        this.groupTrip = groupTrip;
      }
    }, error => {
      this.goBack();
    }, () => {
      this.loading = false;
    });
  }

  goBack(): void {
    this.router.navigate(['/main/organised']);
  }

}
