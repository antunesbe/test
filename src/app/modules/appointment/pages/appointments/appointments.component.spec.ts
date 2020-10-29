import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppointmentsComponent } from './appointments.component';

const mock = require('../../../../../../mocks/db.json');

describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;
  let fixture: ComponentFixture<AppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentsComponent ],
      imports: [FontAwesomeModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handle the currentDate', () => {

    it('should increment one day to the currentDate', () => {
      component.currentDate = new Date(2020, 10, 20, 0 , 0, 0);
      component.nextDay();
      expect(component.currentDate.getTime()).toBe(new Date(2020, 10, 21, 0, 0, 0).getTime());
    });

    it('should decrement one day to the currentDate', () => {
      component.currentDate = new Date(2020, 10, 20, 0 , 0, 0);
      component.previousDay();
      expect(component.currentDate.getTime()).toBe(new Date(2020, 10, 19, 0, 0, 0).getTime());
    });
  });

  describe('defineTimeSlots', () => {
    it('should populate the time slots with api response',  () => {
      component.currentDate = new Date(2020, 9, 18, 0, 0, 0);
      component.generateTimeSlots(mock.appointments);
      expect(component.appointmentList.length).toEqual(8);
      expect(component.appointmentList[0].id).toEqual(1);
      expect(component.appointmentList[1].id).toEqual(2);
    });

    it('should populate the time slot with empty appointments',  () => {
      component.currentDate = new Date(2020, 9, 20, 0, 0, 0);
      component.generateTimeSlots([]);
      expect(component.appointmentList.length).toEqual(8);
      expect(component.appointmentList[0].id).toEqual(undefined);
      expect(component.appointmentList[1].id).toEqual(undefined);
    });

    it('should populate the time slot with empty appointments merge with api responses',  () => {
      component.currentDate = new Date(2020, 9, 20, 0, 0, 0);
      component.generateTimeSlots([{date: new Date(2020, 9, 20, 12, 0, 0), id: 20}]);
      expect(component.appointmentList.length).toEqual(8);
      expect(component.appointmentList[0].id).toEqual(20);
      expect(component.appointmentList[1].id).toEqual(undefined);
    });
  });
});
