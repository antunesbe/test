import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from './models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  listAppointments(date: Date): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`/v1/appointments`).pipe(
      // This filtering should be done on backend
      map((data) => data.filter(appointment => this.sameDay(new Date(appointment.date), date))),
    );
  }

  scheduleAppointment(appointment: Appointment): Observable<any> {
    if (appointment.id) {
      return this.http.put(`/v1/appointments/${appointment.id}`, appointment);
    } else {
      return this.http.post(`/v1/appointments`, appointment);
    }
  }

  sameDay(date1, date2: Date): boolean {
    if (date1.getFullYear() !== date2.getFullYear()) {
      return false;
    }
    if (date1.getMonth() !== date2.getMonth()) {
      return false;
    }
    if (date1.getDate() !== date2.getDate()) {
      return false;
    }
    return true;
  }
}
