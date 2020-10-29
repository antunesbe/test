import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../appointment.service';
import { Appointment } from '../../models/appointment';
import { AppointmentState } from '../../models/appointment-state.enum';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  AppointmentState = AppointmentState;

  public appointmentList: Appointment[] = [];
  public currentDate: Date;

  constructor(public appointmentService: AppointmentService) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.getAppointments(this.currentDate);
  }

  getAppointments(date: Date) {
    this.appointmentService.listAppointments(date).subscribe((res: Appointment[]) => {
      this.generateTimeSlots(res);
    });
  }

  public generateTimeSlots(list) {
    this.appointmentList = [];
    const dateCursor = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 12, 0, 0, 0);
    for (let i = 0; i < 8 ; i++) {

      const appointment = list.find(data => new Date(data.date).getTime() === dateCursor.getTime());
      if (appointment) {
        this.appointmentList.push(appointment);
      } else {
        this.appointmentList.push(new Appointment({date: new Date(dateCursor)}));
      }
      dateCursor.setMinutes(dateCursor.getMinutes() + 30);
    }
  }

  public nextDay() {
    this.incrementCurrentDay(1);
    this.getAppointments(this.currentDate);
  }

  public previousDay() {
    this.incrementCurrentDay(-1);
    this.getAppointments(this.currentDate);
  }

  public schedule(index: number) {
    if (this.appointmentList[index].state === AppointmentState.FREE) {
      this.appointmentList[index].state = AppointmentState.BOOKED;
      this.appointmentService.scheduleAppointment(this.appointmentList[index]).subscribe((res: Appointment) => {
        this.appointmentList[index] = res;
        alert(`You scheduled a hairdresser appointment!`);
      });
    }
  }

  private incrementCurrentDay(increment) {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate() + increment);
  }

}
