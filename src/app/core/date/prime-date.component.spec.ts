import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CalendarFieldFormatterDirective } from '../../core/date/calendar-field-formatter.directive';
import * as moment from 'moment';

import { PrimeDateComponent } from './prime-date.component';

describe('PrimeDateComponent', () => {
  let component: PrimeDateComponent;
  let fixture: ComponentFixture<PrimeDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PrimeDateComponent, CalendarFieldFormatterDirective]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

   it('should be required by default', () => {
    expect(component.required).toBe(true);
  });

  it('should detect incomplete dates', () => {
    expect(component.isValid()).toBe(false);
    component.setDayValueOnModel('1');
    component.setMonthValueOnModel('1');
    expect(component.isValid()).toBe(false);
  });

  it('should pass validation when completely empty if not required', () =>{
    component.required = false;
    expect(component.isValid()).toBe(true);
    component.setDayValueOnModel('1');
    expect(component.isValid()).toBe(false);
  })

  it('should be valid when setting current date', () =>{
    component.setToToday();
    expect(component.isValid()).toBe(true);
    expect(component.month).toEqual(moment().month() + 1)
    expect(component.year).toEqual(moment().year())
    expect(component.day).toEqual(moment().date())
  })

});