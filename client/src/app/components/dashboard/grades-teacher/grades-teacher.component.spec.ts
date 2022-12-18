import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesTeacherComponent } from './grades-teacher.component';

describe('GradesTeacherComponent', () => {
  let component: GradesTeacherComponent;
  let fixture: ComponentFixture<GradesTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradesTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
