import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './landing/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'parking',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/parking/parking.module').then((m) => m.ParkingModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('../app/error/error.module').then((m) => m.ErrorModule),
    data: { message: 'Oops something went wrong 😕' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
