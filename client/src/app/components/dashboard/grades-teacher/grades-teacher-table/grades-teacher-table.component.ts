import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from 'src/app/interfaces/course.interface';
import { User } from 'src/app/interfaces/user.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GradeService } from 'src/app/services/grade.service';
import { Grade } from 'src/app/interfaces/grade.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GradeDialogComponent } from '../../dialogs/grade-dialog/grade-dialog.component';

@Component({
  selector: 'app-grades-teacher-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './grades-teacher-table.component.html',
  styleUrls: ['./grades-teacher-table.component.scss']
})
export class GradesTeacherTableComponent implements OnInit {
  @Input() course: Course | any;
  @Input() students: Array<User> = [];

  private allGrades: Array<Grade> | any;

  constructor(private gradeService: GradeService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getGradesPerCourse();
  }

  getGrades(studentId: number): Array<Grade> {
    return this.allGrades?.filter((grade: Grade) => grade.userId === studentId)
  }

  openViewGrade(course: any, student: User, grade?: Grade) {
    const dialogRef = this.dialog.open(GradeDialogComponent, {
      data: { grade, course, student },
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(() => {
      // TODO: get grades only when anything changes
      this.getGradesPerCourse()
    })
  }

  private getGradesPerCourse() {
    this.gradeService.getGradesPerCourse(this.course.id).subscribe((data: any) => {
      this.allGrades = data
    })
  }
}
