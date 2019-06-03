import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PopoverModule } from "ngx-popover";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EventViewComponent } from './components/event-view/event-view.component';
import { EventListViewComponent } from './components/event-list-view/event-list-view.component';
import { EventViewStatusComponent } from './components/event-view-status/event-view-status.component';
import { CommentListViewComponent } from './components/comment-list-view/comment-list-view.component';
import { CommentViewComponent } from './components/comment-view/comment-view.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { UserService } from './services/user/user.service';
import { GroupTripService } from './services/group-trip/group-trip.service';
import { HostService } from './services/host/host.service';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './services/globals/globals.service';
import { HeaderInterceptor } from './interceptors/header-interceptor/header-interceptor.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NewGroupTripComponent } from './components/new-group-trip/new-group-trip.component';
import { TripMemberComponent } from './components/new-group-trip/trip-member/trip-member.component';
import { OfficeService } from './services/office/office.service';
import { AddDocumentModalComponent } from './components/modals/add-document-modal/add-document-modal.component';
import { RefreshService } from './services/refresh/refresh.service';
import { DateFormatterService } from './services/date-formatter.service';
import { ManageViewComponent } from './components/manage-view/manage-view.component';
import { RegisterEmployeeComponent } from './components/register-employee/register-employee.component';
import { RemoveEmployeeComponent } from './components/remove-employee/remove-employee.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { OrganisedTripsListViewComponent } from './components/organised-trips-list-view/organised-trips-list-view.component';
import { NewOfficeComponent } from './components/new-office/new-office.component';
import { OrganisedGroupTripViewComponent } from './components/organised-group-trip-view/organised-group-trip-view.component';
import { TripService } from './services/trip/trip.service';
import { EditGroupTripComponent } from './components/edit-group-trip/edit-group-trip.component';
import { EmployeeManagementViewComponent } from './components/employee-management-view/employee-management-view.component';
import { JoinTripModalComponent } from './components/modals/join-trip-modal/join-trip-modal.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { RequiredCheckComponent } from './components/required-check/required-check.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EventViewComponent,
    EventListViewComponent,
    EventViewStatusComponent,
    CommentListViewComponent,
    CommentViewComponent,
    EventDetailsComponent,
    LoginViewComponent,
    SpinnerComponent,
    NewGroupTripComponent,
    TripMemberComponent,
    AddDocumentModalComponent,
    ManageViewComponent,
    RegisterEmployeeComponent,
    RemoveEmployeeComponent,
    ConfirmationModalComponent,
    OrganisedTripsListViewComponent,
    NewOfficeComponent,
    OrganisedGroupTripViewComponent,
    EditGroupTripComponent,
    EmployeeManagementViewComponent,
    JoinTripModalComponent,
    MemberDetailsComponent,
    RequiredCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule,
    HttpClientModule,
    PopoverModule,
    NgbModule,
    FormsModule,
    UiSwitchModule,
  ],
  providers: [
    UserService,
    GroupTripService,
    HostService,
    LocalStorageService,
    HttpClient,
    GlobalsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    OfficeService,
    RefreshService,
    DateFormatterService,
    TripService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddDocumentModalComponent,
    ConfirmationModalComponent,
    JoinTripModalComponent
  ]
})
export class AppModule { }
