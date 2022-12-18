import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Course } from 'src/app/interfaces/course.interface';
import { User } from 'src/app/interfaces/user.interface';
import { GradeService } from 'src/app/services/grade.service';
import { UserService } from 'src/app/services/user.service';
import { Roles } from 'src/app/utils/roles.enum';
import { GradesTeacherTableComponent } from './grades-teacher-table/grades-teacher-table.component';


@Component({
  selector: 'app-grades-teacher',
  standalone: true,
  imports: [CommonModule, MatTabsModule, GradesTeacherTableComponent],
  templateUrl: './grades-teacher.component.html',
  styleUrls: ['./grades-teacher.component.scss']
})
export class GradesTeacherComponent {
  courses: Array<Course>;
  students: Array<User> = [];

  constructor(private gradeService: GradeService, private userService: UserService) {
    this.courses = this.gradeService.getCourses();
  }

  ngOnInit() {
    this.userService.getUsers(Roles.Student).subscribe((data: Array<User>) => {
      this.students = data
    })
  }
}
