import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { AppointmentRoutingModule } from './appointment-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    AppointmentRoutingModule
  ],
  declarations: [AppointmentsComponent]
})
export class AppointmentModule { }
