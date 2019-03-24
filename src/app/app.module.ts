import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EventViewComponent } from './components/event-view/event-view.component';
import { EventListViewComponent } from './components/event-list-view/event-list-view.component';
import { EventViewStatusComponent } from './components/event-view-status/event-view-status.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    EventViewComponent,
    EventListViewComponent,
    EventViewStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
