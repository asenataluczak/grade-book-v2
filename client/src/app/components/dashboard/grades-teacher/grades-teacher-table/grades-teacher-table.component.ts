import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from 'src/app/interfaces/course.interface';
import { User } from 'src/app/interfaces/user.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-grades-teacher-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './grades-teacher-table.component.html',
  styleUrls: ['./grades-teacher-table.component.scss']
})
export class GradesTeacherTableComponent {

  @Input() course: Course | undefined;
  @Input() students: Array<User> = [];

  getGrades(id: number): Array<{ value: number }> { return [{ value: 1 }] }
}
