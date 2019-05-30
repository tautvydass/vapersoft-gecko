import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { NgbTypeahead, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { ConfirmationModalViewModel } from 'src/app/view-models/confirmation-modal-view-model';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'remove-employee',
  templateUrl: './remove-employee.component.html',
  styleUrls: ['./remove-employee.component.css']
})
export class RemoveEmployeeComponent implements OnInit {

  loading: boolean = false;

  userModel: User;

  selectedUser: User;

  users: User[];

  currentUser: User;

  showErrorAlert: boolean = false;

  @Output()
  onUserRemoved = new EventEmitter<string>();

  @ViewChild('userInstance') userInstance: NgbTypeahead;
  userFocus$ = new Subject<string>();
  userClick$ = new Subject<string>();

  constructor(
    private userService: UserService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.userService.getCachedUser().subscribe(user => this.currentUser = user);
    this.refreshUsers();
  }

  refreshUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    }, error => {
      // TODO: handle error
    }, () => {
      this.loading = false;
    });
  }

  closeErrorAlert(): void {
    this.showErrorAlert = false;
  }

  launchConfirmationModal(): void {
    if (!this.selectedUser) {
      return;
    }
    if (this.currentUser.id === this.selectedUser.id) {
      this.showErrorAlert = true;
      return;
    }
    this.showErrorAlert = false;
    const viewModel: ConfirmationModalViewModel = {
      title: '<strong>Confirmation</strong>',
      body: `Are you sure you want to remove employee <strong>` + this.selectedUser.fullname + `</strong>? This action <strong>cannot</strong> be undone.`,
      buttonName: `Delete`,
      onSubmit: new EventEmitter(),
      useSecondaryButton: false,
      onSecondary: null,
      secondaryButtonName: null
    };
    viewModel.onSubmit.subscribe(() => this.confirmUserRemoval());
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.viewModel = viewModel;
  }

  confirmUserRemoval(): void {
    this.loading = true;
    this.userService.deleteUser(this.selectedUser).subscribe(result => {
      this.onUserRemoved.emit(this.selectedUser.fullname);
      this.selectedUser = null;
      this.userModel = null;
      this.refreshUsers();
    }, error => {
      this.loading = false;
      // TODO: handle error
    });
  }

  // User Select

  userSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.userClick$.pipe(filter(() => !this.userInstance.isPopupOpen()));
    const inputFocus$ = this.userFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.users : this.users
      .filter(user => user.fullname.toLowerCase().indexOf(term.toLowerCase()) > -1 || user.email.toLowerCase().indexOf(term.toLowerCase())))
      .slice(0, 10))
    );
  }

  userFormatter = (user: User) => user.fullname;

  onUserSelect(selected: any): void {
    this.selectedUser = selected.item;
  }

  onUserBlur(): void {
    if ((typeof this.userModel) === "string") {
      this.userModel = null;
      this.selectedUser = null;
    } else {
      this.selectedUser = this.userModel;
    }
  }

}
