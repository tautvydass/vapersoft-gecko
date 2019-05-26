import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListViewComponent } from './components/event-list-view/event-list-view.component';
import { LoginViewComponent } from "src/app/components/login-view/login-view.component";
import { NewGroupTripComponent } from './components/new-group-trip/new-group-trip.component';

const routes: Routes = [
  { path: '', component: LoginViewComponent },
  { path: 'main', component: EventListViewComponent },
  { path: 'main/create', component: NewGroupTripComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
