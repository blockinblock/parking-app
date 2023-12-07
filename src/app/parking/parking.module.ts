import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ParkingRoutingModule } from './parking-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ParkingComponent } from './parking/parking.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [ParkingComponent, UserComponent],
  imports: [
    ParkingRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
})
export class ParkingModule {}
