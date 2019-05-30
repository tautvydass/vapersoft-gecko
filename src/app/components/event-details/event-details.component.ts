import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { GroupTrip } from 'src/app/models/group-trip';
import { Trip } from 'src/app/models/trip';
import { UserService } from 'src/app/services/user/user.service';
import { GroupTripViewModel } from 'src/app/view-models/group-trip-view-model';
import { TripService } from 'src/app/services/trip/trip.service';
import { ConfirmationModalViewModel } from 'src/app/view-models/confirmation-modal-view-model';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  @Input()
  viewModel: GroupTripViewModel;

  loading: boolean = false;

  cancelRequestButtonName: string;
  members: string = null;

  constructor(
    private tripService: TripService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.updateButtonName();
    this.members = this.viewModel.groupTrip.userTrips
      .filter(trip => trip.id !== this.viewModel.myTrip.id)
      .map(trip => trip.user.fullname)
      .join(", ");
  }

  updateButtonName(): void {
    this.cancelRequestButtonName = this.viewModel.myTrip.requestedCancel ? 'Withdraw cancel request' : 'Request to cancel';
  }

  requestCancel(): void {
    if (this.viewModel.myTrip.requestedCancel) {
      this.loading = true;
      this.tripService.restoreTrip(this.viewModel.myTrip).subscribe(trip => {
        this.viewModel.myTrip = trip;
      }, error => {
        // TODO: handle error
      }, () => {
        this.updateButtonName();
        this.loading = false;
      });
    } else {
      this.launchConfirmationModal();
    }
  }

  confirm(): void {
    if (!this.viewModel.myTrip.confirmed) {
      this.loading = true;
      this.tripService.confirmTrip(this.viewModel.myTrip).subscribe(trip => {
        this.viewModel.myTrip = trip;
      }, error => {
        // TODO: handle error
      }, () => {
        this.updateButtonName();
        this.loading = false;
      });
    }
  }

  launchConfirmationModal(): void {
    const viewModel: ConfirmationModalViewModel = {
      title: '<strong>Confirmation</strong>',
      body: `Are you sure you want to send a request to <strong>cancel</strong> this trip? You will be able to withdraw the cancel request afterwards if you wish.`,
      buttonName: `Confirm`,
      onSubmit: new EventEmitter(),
      onSecondary: null,
      secondaryButtonName: null,
      useSecondaryButton: false
    };
    viewModel.onSubmit.subscribe(() => this.confirmCancelRequest());
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.viewModel = viewModel;
  }

  confirmCancelRequest(): void {
    this.loading = true;
    this.tripService.cancelTrip(this.viewModel.myTrip).subscribe(trip => {
      this.viewModel.myTrip = trip;
    }, error => {
      // TODO: handle error
    }, () => {
      this.updateButtonName();
      this.loading = false;
    });
  }

}
