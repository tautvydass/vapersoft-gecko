import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { Office } from 'src/app/models/office';
import { UserService } from 'src/app/services/user/user.service';
import { MemberViewModel } from 'src/app/view-models/member-view-model';
import { isNullOrUndefined } from 'util';
import { OfficeService } from 'src/app/services/office/office.service';
import { Observable, Subject, merge } from 'rxjs';
import { NgbTypeahead, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Houseroom } from 'src/app/models/houseroom';
import { Role } from 'src/app/models/enums/role';
import { GroupTrip } from 'src/app/models/group-trip';
import { Status } from 'src/app/models/enums/status';
import { toDate } from '@angular/common/src/i18n/format_date';
import { Trip } from 'src/app/models/trip';
import { GroupTripService } from 'src/app/services/group-trip/group-trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'new-group-trip',
  templateUrl: './new-group-trip.component.html',
  styleUrls: ['./new-group-trip.component.css']
})
export class NewGroupTripComponent implements OnInit {

  usersLoading: boolean = true;
  officesLoading: boolean = true;
  loadingHouserooms: boolean = false;
  loadingUserAvailability: boolean = false;
  loadingSubmit: boolean = false;

  officeToModel: Office;
  officeFromModel: Office;
  advisorModel: User;

  users: User[];
  advisors: User[];

  availableUsers: User[];

  offices: Office[];
  availableOffices: Office[];

  members: MemberViewModel[] = [];

  isFormValid: boolean = false;

  memberCount: number = 0;

  selectedOfficeTo: Office;
  selectedOfficeFrom: Office;
  selectedAdvisor: User;

  availableHouserooms: Houseroom[];

  currentUser: User;

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  @ViewChild('instanceOfficeTo') instanceOfficeTo: NgbTypeahead;
  officeToFocus$ = new Subject<string>();
  officeToClick$ = new Subject<string>();

  @ViewChild('instanceOfficeFrom') instanceOfficeFrom: NgbTypeahead;
  officeFromFocus$ = new Subject<string>();
  officeFromClick$ = new Subject<string>();

  @ViewChild('instanceAdvisor') instanceAdvisor: NgbTypeahead;
  advisorFocus$ = new Subject<string>();
  advisorClick$ = new Subject<string>();

  constructor(
    private userService: UserService,
    private officeService: OfficeService,
    private groupTripService: GroupTripService,
    private router: Router) { }

  ngOnInit() {

    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.availableUsers = users;
      this.advisors = users.filter(user => user.role.toString() === Role[Role.ADVISOR]);
    }, error => {
      console.error(error.message);
    }, () => {
      this.usersLoading = false;
    });

    this.officeService.getOffices().subscribe(offices => {
      this.offices = offices;
      this.availableOffices = offices;
    }, error => {
      console.error(error.message);
    }, () => {
      this.officesLoading = false;
    });

    this.userService.getUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  loading(): boolean {
    return this.officesLoading || this.usersLoading || this.loadingHouserooms || this.loadingUserAvailability;
  }

  addMember(): void {
    if (isNullOrUndefined(this.availableUsers) || this.availableUsers.length === 0 || this.members.length >= this.users.length) {
      return;
    }
    if (this.members.filter(member => isNullOrUndefined(member.selectedUser)).length > 0) {
      return;
    }
    var member: MemberViewModel = {
      index: this.memberCount++,
      users: this.availableUsers,
      isAvailable: null,
      selectedUser: null,
      containsDetails: false
    };
    this.members.push(member);
  }

  addAndUpdateUsers(user: User): void {
    this.availableUsers.push(user);
    this.updateUsers();
  }

  updateUsers(): void {
      this.members.forEach(member => member.users = this.availableUsers);
  }

  onUserSelected(user: User): void {
    this.availableUsers = this.availableUsers.filter(u => u.id !== user.id);
    this.checkUserAvailability(this.members.find(member => member.selectedUser.id === user.id));
    this.updateUsers();
  }

  removeMember(memberToRemove: MemberViewModel): void {
    this.members = this.members.filter(member => member.index !== memberToRemove.index);
    if (!isNullOrUndefined(memberToRemove.selectedUser)) {
      this.availableUsers.push(memberToRemove.selectedUser);
      this.updateUsers();
    }
  }

  updateAvailableHouserooms(): void {
    if (!isNullOrUndefined(this.toDate) && !isNullOrUndefined(this.selectedOfficeTo)) {
      this.loadingHouserooms = true;
      this.officeService.getAvailableHouserooms(this.selectedOfficeTo.id, this.constructDate(this.fromDate), this.constructDate(this.toDate)).subscribe(houserooms => {
        this.availableHouserooms = houserooms;
        console.log(houserooms);
      }, error => {
        this.availableHouserooms = [];
      }, () => {
        this.loadingHouserooms = false;
      })
    }
  }

  validForm(): boolean {
    return !isNullOrUndefined(this.selectedAdvisor) && !this.loadingSubmit;
  }

  submit(): void {
    var groupTrip: GroupTrip = {
      id: null,
      officeFrom: this.selectedOfficeFrom,
      officeTo: this.selectedOfficeTo,
      dateFrom: this.constructDate(this.fromDate),
      dateTo: this.constructDate(this.toDate),
      status: Status[Status.PENDING].toString(),
      userTrips: this.members.map(member => this.createTrip(member)),
      advisor: this.selectedAdvisor,
      comments: []
    };
    this.loadingSubmit = true;

    this.groupTripService.createGroupTrip(groupTrip).subscribe(gt => {
      this.router.navigate(['/']);
    }, error => {
      console.error(error);
    }, () => {
      this.loadingSubmit = false;
    })
  }

  createTrip(member: MemberViewModel): Trip {
    return {
      id: null,
      user: member.selectedUser,
      documents: [],
      houserooms: null,
      tripInfo: null
    };
  }

  checkUserAvailability(memberViewModel: MemberViewModel): void {
    memberViewModel.isAvailable = null;
    this.loadingUserAvailability = true;
    this.userService.checkUserAvailability(memberViewModel.selectedUser, this.constructDate(this.fromDate), this.constructDate(this.toDate)).subscribe(unavailabilityPeriods => {
      memberViewModel.isAvailable = unavailabilityPeriods.length === 0;
    }, error => {
      console.error(error);
    }, () => {
      this.loadingUserAvailability = false;
    });
  }

  // Date selection

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.members.forEach(member => this.checkUserAvailability(member));
      this.updateAvailableHouserooms();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  constructDate(date: NgbDate): string {
    return date.year + "-" + date.month + "-" + date.day;
  }

  // Office selection

  officeFormatter = (office: Office) => office.name + ", " + office.address;

  // OfficeFrom selection

  searchOfficeFrom = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.officeFromClick$.pipe(filter(() => !this.instanceOfficeFrom.isPopupOpen()));
    const inputFocus$ = this.officeFromFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.availableOffices : this.availableOffices
        .filter(office => office.name.toLowerCase().indexOf(term.toLowerCase()) > -1 || office.address.toLowerCase().indexOf(term.toLowerCase()) > -1))
        .slice(0, 10))
    );
  }

  onOfficeFromSelected(selected: any): void {
    if (!isNullOrUndefined(this.selectedOfficeFrom)) {
      this.availableOffices.push(this.selectedOfficeFrom);
    }
    this.selectedOfficeFrom = selected.item;
    this.availableOffices = this.availableOffices.filter(office => office.id !== this.selectedOfficeFrom.id);
    this.updateAvailableHouserooms();
  }

  onOfficeFromBlur(): void {
    if ((typeof this.officeFromModel) === "string") {
      if (!isNullOrUndefined(this.selectedOfficeFrom)) {
        this.availableOffices.push(this.selectedOfficeFrom);
      }
      this.officeFromModel = null;
      this.selectedOfficeFrom = null;
    }
  }

  // OfficeTo selection

  searchOfficeTo = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.officeToClick$.pipe(filter(() => !this.instanceOfficeTo.isPopupOpen()));
    const inputFocus$ = this.officeToFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.availableOffices : this.availableOffices
        .filter(office => office.name.toLowerCase().indexOf(term.toLowerCase()) > -1 || office.address.toLowerCase().indexOf(term.toLowerCase()) > -1))
        .slice(0, 10))
    );
  }

  onOfficeToSelected(selected: any): void {
    if (!isNullOrUndefined(this.selectedOfficeTo)) {
      this.availableOffices.push(this.selectedOfficeTo);
    }
    this.selectedOfficeTo = selected.item;
    this.availableOffices = this.availableOffices.filter(office => office.id !== this.selectedOfficeTo.id);
    this.updateAvailableHouserooms();
  }

  onOfficeToBlur(): void {
    if ((typeof this.officeToModel) === "string") {
      if (!isNullOrUndefined(this.selectedOfficeTo)) {
        this.availableOffices.push(this.selectedOfficeTo);
      }
      this.officeToModel = null;
      this.selectedOfficeTo = null;
    }
  }

  // Advisor selection

  searchAdvisor = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.advisorClick$.pipe(filter(() => !this.instanceAdvisor.isPopupOpen()));
    const inputFocus$ = this.advisorFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.advisors : this.advisors
        .filter(advisor => advisor.fullname.toLowerCase().indexOf(term.toLowerCase()) > -1 || advisor.email.toLowerCase().indexOf(term.toLowerCase()) > -1))
        .slice(0, 10))
    );
  }

  advisorFormatter = (advisor: User) => advisor.fullname;

  onAdvisorSelected(selected: any): void {
    this.selectedAdvisor = selected.item;
  }

  onAdvisorBlur(): void {
    if ((typeof this.advisorModel) === "string") {
      this.advisorModel = null;
      this.selectedAdvisor = null;
    }
  }
}
