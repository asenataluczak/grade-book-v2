import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Course } from 'src/app/interfaces/course.interface';
import { GradeService } from 'src/app/services/grade/grade.service';


@Component({
  selector: 'app-grades-teacher',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './grades-teacher.component.html',
  styleUrls: ['./grades-teacher.component.scss']
})
export class GradesTeacherComponent {
  courses: Array<Course>;

  constructor(private gradeService: GradeService) {
    this.courses = this.gradeService.getCourses();
  }
}
