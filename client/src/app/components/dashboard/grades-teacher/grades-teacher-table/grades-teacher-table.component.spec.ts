import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesTeacherTableComponent } from './grades-teacher-table.component';

describe('GradesTeacherTableComponent', () => {
  let component: GradesTeacherTableComponent;
  let fixture: ComponentFixture<GradesTeacherTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GradesTeacherTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradesTeacherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
