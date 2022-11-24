import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-grades-student',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './grades-student.component.html',
  styleUrls: ['./grades-student.component.scss']
})
export class GradesStudentComponent {
  courses = [{name: 'Matematyka'}, {name: 'Przyroda'}];
  userId = 2;
  allGrades = [{grades: [{value: 2}, {value: 5}]}];

  openViewGrade(grade: any, course: any) {
  }
}
