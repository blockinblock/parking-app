import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ParkingRoutingModule } from './parking-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ParkingComponent } from './parking/parking.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [ParkingComponent, UserComponent],
  imports: [
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    ParkingRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
})
export class ParkingModule {}
