import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupTripService } from 'src/app/services/group-trip/group-trip.service';
import { GroupTrip } from 'src/app/models/group-trip';
import { isNullOrUndefined } from 'util';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { Observable, merge, Subject } from 'rxjs';
import { Office } from 'src/app/models/office';
import { NgbDate, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { MemberViewModel } from 'src/app/view-models/member-view-model';
import { Trip } from 'src/app/models/trip';
import { Status } from 'src/app/models/enums/status';
import { Houseroom } from 'src/app/models/houseroom';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/enums/role';
import { UserService } from 'src/app/services/user/user.service';
import { OfficeService } from 'src/app/services/office/office.service';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'edit-group-trip',
  templateUrl: './edit-group-trip.component.html',
  styleUrls: ['./edit-group-trip.component.css']
})
export class EditGroupTripComponent implements OnInit {

  groupTripId: number = null;

  groupTrip: GroupTrip;

  loadingGroupTrip: boolean = false;
  usersLoading: boolean = true;
  officesLoading: boolean = true;
  loadingHouserooms: boolean = false;
  loadingUserAvailability: boolean = false;
  loadingSubmit: boolean = false;

  title: string;

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

  houseroomCount: number;
  availableHouserooms: Houseroom[];

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  showErrorAlert: boolean = false;
  errorMessage: string = null;

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
    private router: Router,
    private route: ActivatedRoute) {
      this.groupTripId = route.snapshot.params['id'];
     }

  ngOnInit() {
    
    if (!this.groupTripId || this.groupTripId < 1) {
      this.goBack();
    }
    this.loadingGroupTrip = true;
    this.groupTripService.getGroupTrip(this.groupTripId).subscribe(groupTrip => {
      if (groupTrip == null) {
        this.goBack();
      } else {
        this.groupTrip = groupTrip;
        this.userService.getUsers().subscribe(users => {
          this.users = users;
          this.availableUsers = users;
          this.advisors = users.filter(user => user.role.toString() !== Role[Role.DEFAULT]);
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

        this.fillInFields();
      }
    }, error => {
      this.goBack();
    }, () => {
      this.loadingGroupTrip = false;
    });
  }

  fillInFields(): void {
    this.title = this.groupTrip.title;

    var dateFromValues = this.groupTrip.dateFrom.split("-");
    this.fromDate = new NgbDate(+dateFromValues[0], +dateFromValues[1], +dateFromValues[2]);

    var dateToValues = this.groupTrip.dateTo.split("-");
    this.toDate = new NgbDate(+dateToValues[0], +dateToValues[1], +dateToValues[2]);

    this.officeFromModel = this.groupTrip.officeFrom;
    this.selectedOfficeFrom = this.groupTrip.officeFrom;

    this.officeToModel = this.groupTrip.officeTo;
    this.selectedOfficeTo = this.groupTrip.officeTo;
  }

  goBack(): void {
    this.router.navigate(['/main/organised']);
  }

  loading(): boolean {
    return this.officesLoading || this.usersLoading || this.loadingHouserooms || this.loadingUserAvailability || this.loadingGroupTrip;
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
      houserooms: this.availableHouserooms,
      isAvailable: null,
      selectedUser: null,
      selectedHouseroom: null,
      containsDetails: false,
      onSelectedHouseroomChanged: new EventEmitter(),
      checkingAvailability: false
    };
    this.members.push(member);
    
    setTimeout(() => {
      if (!isNullOrUndefined(this.availableHouserooms) && this.availableHouserooms.length > 0) {
        member.onSelectedHouseroomChanged.emit(this.availableHouserooms.pop());
      }
    }, 50);
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
    if (this.canCheckUserAvailability()) {
      this.checkUserAvailability(this.members.find(member => member.selectedUser.id === user.id));
    }
    this.updateUsers();
  }

  canCheckUserAvailability(): boolean {
    return !isNullOrUndefined(this.toDate);
  }

  removeMember(memberToRemove: MemberViewModel): void {
    this.members = this.members.filter(member => member.index !== memberToRemove.index);
    if (!isNullOrUndefined(memberToRemove.selectedUser)) {
      this.availableUsers.push(memberToRemove.selectedUser);
      this.updateUsers();
    }
    if (!isNullOrUndefined(memberToRemove.selectedHouseroom)) {
      this.onHouseroomDeselect(memberToRemove.selectedHouseroom);
    }
  }

  onHouseroomSelect(houseroom: Houseroom): void {
    this.availableHouserooms = this.availableHouserooms.filter(h => h.id !== houseroom.id);
    this.members.forEach(member => member.houserooms = this.availableHouserooms);
  }

  onHouseroomDeselect(houseroom: Houseroom): void {
    this.availableHouserooms.push(houseroom);
    this.members.forEach(member => member.houserooms = this.availableHouserooms);
  }

  updateAvailableHouserooms(): void {
    if (!isNullOrUndefined(this.toDate) && !isNullOrUndefined(this.selectedOfficeTo)) {
      this.loadingHouserooms = true;
      this.officeService.getAvailableHouserooms(this.selectedOfficeTo.id, this.constructDate(this.fromDate), this.constructDate(this.toDate)).subscribe(houserooms => {
        this.availableHouserooms = houserooms;
      }, error => {
        this.availableHouserooms = [];
      }, () => {
        this.loadingHouserooms = false;
        this.houseroomCount = this.availableHouserooms.length;
        const count = Math.min(this.houseroomCount, this.members.length);
        for(var i = 0; i < count; i++) {
          this.members[i].onSelectedHouseroomChanged.emit(this.availableHouserooms.pop());
        }
        for(var i = count; i < this.members.length; i++) {
          this.members[i].onSelectedHouseroomChanged.emit(null);
        }
        this.members.forEach(member => member.houserooms = this.availableHouserooms);
      });
    }
  }

  validForm(): boolean {
    return !isNullOrUndefined(this.selectedAdvisor) && !this.loadingSubmit;
  }

  submit(): void {
    /*
    if (!this.validateForm()) {
      this.showErrorAlert = true;
      return;
    }
    var groupTrip: GroupTrip = {
      id: null,
      title: this.title,
      officeFrom: this.selectedOfficeFrom,
      officeTo: this.selectedOfficeTo,
      dateFrom: this.constructDate(this.fromDate),
      dateTo: this.constructDate(this.toDate),
      status: Status[Status.PENDING].toString(),
      userTrips: this.members.map(member => this.createTrip(member)),
      advisor: this.selectedAdvisor,
      comments: [],
      date: null
    };
    console.log(JSON.stringify(groupTrip));
    this.loadingSubmit = true;
    this.groupTripService.createGroupTrip(groupTrip).subscribe(gt => {
      // TODO: show success alert
      this.router.navigate(['/']);
    }, error => {
      console.error(error);
    }, () => {
      this.loadingSubmit = false;
    });
    */
  }

  validateForm(): boolean {
    if (!this.title) {
      this.errorMessage = "Please fill in the title.";
      return false;
    }
    if (!this.selectedOfficeFrom || !this.selectedOfficeTo) {
      this.errorMessage = "Please select offices.";
      return false;
    }
    if (!this.toDate || !this.fromDate) {
      this.errorMessage = "Please select travel date.";
      return false;
    }
    var validMembers: MemberViewModel[] = this.members.filter(member => member.selectedUser !== null);
    if (validMembers.length < 1) {
      this.errorMessage = "Please select at least one member.";
      return false;
    }
    if (validMembers.filter(member => !member.isAvailable).length > 0) {
      this.errorMessage = "Not all members are available.";
      return false;
    }

    return true;
  }

  createTrip(member: MemberViewModel): Trip {
    /*
    return {
      id: null,
      user: member.selectedUser,
      documents: [],
      houserooms: isNullOrUndefined(member.selectedHouseroom) ? [] : [member.selectedHouseroom],
      tripInfo: null,
      confirmed: false,
      requestedCancel: false
    };
    */
   return null;
  }

  checkUserAvailability(memberViewModel: MemberViewModel): void {
    memberViewModel.isAvailable = null;
    if (isNullOrUndefined(memberViewModel.selectedUser)) {
      return;
    }
    this.loadingUserAvailability = true;
    memberViewModel.checkingAvailability = true;
    this.userService.checkUserAvailability(memberViewModel.selectedUser, this.constructDate(this.fromDate), this.constructDate(this.toDate)).subscribe(unavailabilityPeriods => {
      memberViewModel.isAvailable = unavailabilityPeriods.length === 0;
    }, error => {
      console.error(error);
    }, () => {
      this.loadingUserAvailability = false;
      memberViewModel.checkingAvailability = false;
    });
  }

  closeErrorAlert(): void {
    this.showErrorAlert = false;
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
      this.availableHouserooms = [];
      this.members.forEach(member => {
        member.onSelectedHouseroomChanged.emit(null);
        member.houserooms = [];
      });
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
