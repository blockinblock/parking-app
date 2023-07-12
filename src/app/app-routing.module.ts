import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { ParkingComponent } from './components/parking/parking.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'parking', canActivate: [AuthGuard], component: ParkingComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Oops something went wrong 😕'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
