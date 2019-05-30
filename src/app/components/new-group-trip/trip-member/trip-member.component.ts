import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MemberViewModel } from 'src/app/view-models/member-view-model';
import { User } from 'src/app/models/user';
import { NgbTypeahead, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { UserService } from 'src/app/services/user/user.service';
import { Houseroom } from 'src/app/models/houseroom';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { AddDocumentModalComponent } from '../../modals/add-document-modal/add-document-modal.component';
import { DocumentViewModel } from 'src/app/view-models/document-view-model';

@Component({
  selector: 'trip-member',
  templateUrl: './trip-member.component.html',
  styleUrls: ['./trip-member.component.css']
})
export class TripMemberComponent implements OnInit {

  @Input()
  viewModel: MemberViewModel;

  @Output()
  onRemove: EventEmitter<MemberViewModel> = new EventEmitter();

  @Output()
  onSelected: EventEmitter<User> = new EventEmitter();

  @Output()
  onDeselected: EventEmitter<User> = new EventEmitter();

  @Output()
  onHouseroomSelected: EventEmitter<Houseroom> = new EventEmitter();

  @Output()
  onHouseroomDeselected: EventEmitter<Houseroom> = new EventEmitter();

  userModel: User;
  houseroomModel: Houseroom;

  @ViewChild('userInstance') userInstance: NgbTypeahead;
  userFocus$ = new Subject<string>();
  userClick$ = new Subject<string>();

  @ViewChild('houseroomInstance') houseroomInstance: NgbTypeahead;
  houseroomFocus$ = new Subject<string>();
  houseroomClick$ = new Subject<string>();

  constructor(
    private userService: UserService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.viewModel.onSelectedHouseroomChanged.subscribe(houseroom => {
      this.viewModel.selectedHouseroom = houseroom;
      this.houseroomModel = houseroom;
    });
  }

  remove(): void {
    this.onRemove.emit(this.viewModel);
  }

  getCheckboxId(): number {
    return this.viewModel.index;
  }

  isHouseroomDisabled(): boolean {
    return isNullOrUndefined(this.houseroomModel) && (isNullOrUndefined(this.viewModel.houserooms) || this.viewModel.houserooms.length === 0);
  }

  getHouseroomPlaceholder(): string {
    return this.isHouseroomDisabled() ? "apartment not available" : "select apartment";
  }

  launchDocumentModal(): void {
    const viewModel: DocumentViewModel = {
      onDocumentAdded: new EventEmitter(),
      onDocumentRemoved: new EventEmitter()
    };
    viewModel.onDocumentAdded.subscribe(doc => this.addDocument(doc));
    viewModel.onDocumentRemoved.subscribe(doc => this.removeDocument(doc));
    const modalRef = this.modalService.open(AddDocumentModalComponent);
    modalRef.componentInstance.viewModel = viewModel;
  }

  addDocument(document: Document): void {

  }

  removeDocument(document: Document): void {
    
  }

  // User Select

  userSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.userClick$.pipe(filter(() => !this.userInstance.isPopupOpen()));
    const inputFocus$ = this.userFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.viewModel.users : this.viewModel.users
      .filter(user => user.fullname.toLowerCase().indexOf(term.toLowerCase()) > -1 || user.email.toLowerCase().indexOf(term.toLowerCase())))
      .slice(0, 10))
    );
  }

  userFormatter = (user: User) => user.fullname;

  onUserSelect(selected: any): void {
    if (!isNullOrUndefined(this.viewModel.selectedUser)) {
      this.onDeselected.emit(this.viewModel.selectedUser);
    }
    this.viewModel.selectedUser = selected.item;
    this.onSelected.emit(selected.item);
  }

  onUserBlur(): void {
    if ((typeof this.userModel) === "string") {
      this.userModel = null;
      if (!isNullOrUndefined(this.viewModel.selectedUser)) {
        this.onDeselected.emit(this.viewModel.selectedUser);
        this.viewModel.selectedUser = null;
      }
    }
  }

  // Houseroom Select

  houseroomSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.houseroomClick$.pipe(filter(() => !this.houseroomInstance.isPopupOpen()));
    const inputFocus$ = this.houseroomFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.viewModel.houserooms : this.viewModel.houserooms
      .filter(houseroom => houseroom.name.toLowerCase().indexOf(term.toLowerCase()) > -1))
      .slice(0, 10))
    );
  }

  houseroomFormatter = (houseroom: Houseroom) => houseroom.name;

  onHouseroomSelect(selected: any): void {
    if (!isNullOrUndefined(this.viewModel.selectedHouseroom)) {
      this.onHouseroomDeselected.emit(this.viewModel.selectedHouseroom);
    }
    this.viewModel.selectedHouseroom = selected.item;
    this.onHouseroomSelected.emit(selected.item);
  }

  onHouseroomBlur(): void {
    if ((typeof this.houseroomModel) === "string") {
      this.houseroomModel = null;
      if (!isNullOrUndefined(this.viewModel.selectedHouseroom)) {
        this.onHouseroomDeselected.emit(this.viewModel.selectedHouseroom);
        this.viewModel.selectedHouseroom = null;
      }
    }
  }

}
