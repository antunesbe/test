import { AppointmentState } from './appointment-state.enum';

export class Appointment {
    id: number;
    date: Date;
    state: AppointmentState;

    constructor(data) {
        this.date = data.date;
        this.state = data.state ? data.state : AppointmentState.FREE;
        this.id = data.id;
    }
}
