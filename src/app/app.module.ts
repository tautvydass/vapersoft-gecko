import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
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

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    EventViewComponent,
    EventListViewComponent,
    EventViewStatusComponent,
    CommentListViewComponent,
    CommentViewComponent,
    EventDetailsComponent,
    LoginViewComponent,
    SpinnerComponent,
    NewGroupTripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule,
    HttpClientModule
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
