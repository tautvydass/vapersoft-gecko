import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { GroupTripViewModel } from 'src/app/view-models/group-trip-view-model';
import { GroupTripService } from 'src/app/services/group-trip/group-trip.service';
import { GroupTrip } from 'src/app/models/group-trip';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { JoinTripViewModel } from 'src/app/view-models/join-trip-view-model';

@Component({
  selector: 'join-trip-modal',
  templateUrl: './join-trip-modal.component.html',
  styleUrls: ['./join-trip-modal.component.css']
})
export class JoinTripModalComponent {

  @Input()
  viewModel: JoinTripViewModel;

  @ViewChild('groupTripInstance') groupTripInstance: NgbTypeahead;
  groupTripFocus$ = new Subject<string>();
  groupTripClick$ = new Subject<string>();

  groupTripModel: GroupTrip;

  loading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private groupTripService: GroupTripService) { }

  getPlaceholder(): string {
    return (!this.viewModel.groupTrips || this.viewModel.groupTrips.length === 0) ? 'no trips available for joining' : 'select group trip';
  }

  cancel(): void {
    this.activeModal.close();
  }

  join(): void {
    this.loading = true;
    this.groupTripService.joinGroupTrips(this.viewModel.groupTrip, this.groupTripModel).subscribe(result => {
      this.viewModel.onGroupTripJoined.emit(this.viewModel.groupTrip.title + " and " + this.groupTripModel.title);
    }, error => {
      // handle error
    }, () => {
      this.loading = false;
      this.activeModal.close();
    });
  }

  // Group Trip selection

  searchGroupTrip = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.groupTripClick$.pipe(filter(() => !this.groupTripInstance.isPopupOpen()));
    const inputFocus$ = this.groupTripFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.viewModel.groupTrips : this.viewModel.groupTrips
        .filter(groupTrip => groupTrip.title.toLowerCase().indexOf(term.toLowerCase()) > -1 || groupTrip.officeTo.name.toLowerCase().indexOf(term.toLowerCase()) > -1))
        .slice(0, 10))
    );
  }

  groupTripFormatter = (groupTrip: GroupTrip) => groupTrip.title + ', ' + groupTrip.officeTo.name;

  onGroupTripBlur(): void {
    if ((typeof this.groupTripModel) === "string") {
      this.groupTripModel = null;
    }
  }

}
