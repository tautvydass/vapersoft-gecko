import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    LoginViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
