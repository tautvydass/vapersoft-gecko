import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GroupTrip } from 'src/app/models/group-trip';
import { DateFormatterService } from 'src/app/services/date-formatter.service';
import { GroupTripViewModel } from 'src/app/view-models/group-trip-view-model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalViewModel } from 'src/app/view-models/confirmation-modal-view-model';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { GroupTripService } from 'src/app/services/group-trip/group-trip.service';
import { CommentViewModel } from 'src/app/view-models/comment-view-model';
import { Trip } from 'src/app/models/trip';
import { Status } from 'src/app/models/enums/status';
import { JoinTripModalComponent } from '../modals/join-trip-modal/join-trip-modal.component';
import { JoinTripViewModel } from 'src/app/view-models/join-trip-view-model';

@Component({
  selector: 'organised-group-trip-view',
  templateUrl: './organised-group-trip-view.component.html',
  styleUrls: ['./organised-group-trip-view.component.css']
})
export class OrganisedGroupTripViewComponent implements OnInit {

  @Input()
  viewModel: GroupTripViewModel;

  @Output()
  refresh: EventEmitter<string> = new EventEmitter();

  dateFrom: string;
  dateTo: string;

  loading: boolean = false;

  memberCancelCount: number = 0;
  membersToCancel: string;

  commentViewModel: CommentViewModel = null;
  showComments: boolean = false;

  detailViewModels: GroupTripViewModel[];

  approvableStatus: boolean = false;

  constructor(
    private dateFormatter: DateFormatterService,
    private router: Router,
    private modalService: NgbModal,
    private groupTripService: GroupTripService) { }

  ngOnInit() {
    this.commentViewModel = {
      groupTripId: this.viewModel.groupTrip.id,
      comments: this.viewModel.groupTrip.comments.reverse()
    };
    this.dateFrom = this.dateFormatter.formatDate(this.viewModel.groupTrip.dateFrom);
    this.dateTo = this.dateFormatter.formatDate(this.viewModel.groupTrip.dateTo);
    var cancelMemberNames = this.viewModel.groupTrip.userTrips.filter(trip => trip.requestedCancel).map(trip => trip.user.fullname);
    this.memberCancelCount = cancelMemberNames.length;
    this.membersToCancel = cancelMemberNames.join(", ");
    this.detailViewModels = this.viewModel.groupTrip.userTrips.map(trip => this.createViewModel(trip, this.viewModel));
    this.approvableStatus = this.viewModel.groupTrip.status === Status[Status.PENDING].toString();
  }
  
  createViewModel(trip: Trip, viewModel: GroupTripViewModel): GroupTripViewModel {
    var result: GroupTripViewModel = {
      approvable: viewModel.approvable,
      currentUser: viewModel.currentUser,
      myTrip: trip,
      groupTrip: viewModel.groupTrip
    };
    return result;
  }

  edit(): void {
    this.router.navigate(['/main/organised/edit/' + this.viewModel.groupTrip.id.toString()]);
  }

  approve(): void {
    this.loading = true;
    this.groupTripService.approveGroupTrip(this.viewModel.groupTrip).subscribe(result => {
      this.viewModel.approvable = false;
      this.viewModel.groupTrip = result;
    }, error => {
      // TODO: handle error
    }, () => {
      this.loading = false;
    });
  }

  launchConfirmationModal(): void {
    const viewModel: ConfirmationModalViewModel = {
      title: '<strong>Confirmation</strong>',
      body: `Are you sure you want to approve this group trip?`,
      buttonName: `Confirm`,
      onSubmit: new EventEmitter(),
      onSecondary: null,
      secondaryButtonName: null,
      useSecondaryButton: false
    };
    viewModel.onSubmit.subscribe(() => this.approve());
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.viewModel = viewModel;
  }

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  closeAlert(): void {
    this.memberCancelCount = 0;
  }

  launchJoinTripModal(): void {
    this.loading = true;
    var joinTripViewModel: JoinTripViewModel = {
      groupTrip: this.viewModel.groupTrip,
      onGroupTripJoined: new EventEmitter(),
      groupTrips: null
    };
    this.groupTripService.getAll().subscribe(groupTrips => {
      joinTripViewModel.groupTrips = groupTrips.filter(groupTrip => 
        groupTrip.id !== this.viewModel.groupTrip.id &&
        groupTrip.officeTo.id === this.viewModel.groupTrip.officeTo.id &&
        groupTrip.officeFrom.id === this.viewModel.groupTrip.officeFrom.id &&
        Math.abs(groupTrip.dateFromNumber - this.viewModel.groupTrip.dateFromNumber) < 2 &&
        Math.abs(groupTrip.dateToNumber - this.viewModel.groupTrip.dateToNumber) < 2);
      
        setTimeout(() => {
          const modalRef = this.modalService.open(JoinTripModalComponent);
          joinTripViewModel.onGroupTripJoined.subscribe(result => this.refresh.emit(result));
          modalRef.componentInstance.viewModel = joinTripViewModel;
        }, 100);
    }, error => {
      // do something
    }, () => {
      this.loading = false;
    });
  }
}
