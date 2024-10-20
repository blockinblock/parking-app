import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [ErrorRoutingModule, RouterModule],
})
export class ErrorModule {}
