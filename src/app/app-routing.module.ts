import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListViewComponent } from './components/event-list-view/event-list-view.component';
import { LoginViewComponent } from "src/app/components/login-view/login-view.component";

const routes: Routes = [
  { path: '', component: LoginViewComponent },
  { path: 'main', component: EventListViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
