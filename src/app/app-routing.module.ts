import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListViewComponent } from './components/event-list-view/event-list-view.component';
import { LoginViewComponent } from "src/app/components/login-view/login-view.component";
import { NewGroupTripComponent } from './components/new-group-trip/new-group-trip.component';
import { ManageViewComponent } from './components/manage-view/manage-view.component';
import { OrganisedTripsListViewComponent } from './components/organised-trips-list-view/organised-trips-list-view.component';
import { EditGroupTripComponent } from './components/edit-group-trip/edit-group-trip.component';

const routes: Routes = [
  { path: '', component: LoginViewComponent },
  { path: 'main', component: EventListViewComponent },
  { path: 'main/organised', component: OrganisedTripsListViewComponent },
  { path: 'main/create', component: NewGroupTripComponent },
  { path: 'main/manage', component: ManageViewComponent },
  { path: 'main/organised/edit/:id', component: EditGroupTripComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
