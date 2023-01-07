import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Course } from 'src/app/interfaces/course.interface';
import { GradeService } from 'src/app/services/grade.service';
import { Grade } from 'src/app/interfaces/grade.interface';
import { GradeDialogComponent } from '../dialogs/grade-dialog/grade-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-grades-student',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './grades-student.component.html',
  styleUrls: ['./grades-student.component.scss']
})
export class GradesStudentComponent {
  courses: Array<Course>;
  userId = 2;
  allGrades: any;

  constructor(private gradeService: GradeService, public dialog: MatDialog) {
    this.courses = this.gradeService.getCourses();
    this.gradeService.getGradesPerUser(+localStorage.getItem('userId')!).subscribe(data => {
      this.allGrades = data;
    })
  }

  getGradesPerCourse(courseId: number) {
    return this.allGrades?.filter((grade: any) => grade.courseId === courseId)
  }

  openViewGrade(grade: Grade, course: any) {
    this.dialog.open(GradeDialogComponent, {
      data: { grade, course },
      width: '700px'
    });

  }
}
