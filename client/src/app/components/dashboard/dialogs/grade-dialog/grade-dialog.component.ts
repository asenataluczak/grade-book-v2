import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Grade } from 'src/app/interfaces/grade.interface';
import { User } from 'src/app/interfaces/user.interface';
import { GradeService } from 'src/app/services/grade.service';
import { getDirtyValues } from 'src/app/utils/utils';

@Component({
  selector: 'app-grade-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './grade-dialog.component.html',
})
export class GradeDialogComponent implements OnInit {
  mainForm: FormGroup | any;
  history: any;

  constructor(
    public dialogRef: MatDialogRef<GradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { grade: Grade; course: any; student?: User },
    private fb: FormBuilder,
    private gradeService: GradeService
  ) {
  }

  ngOnInit() {
    this.buildForm();
    if (this.data.grade) {
      this.gradeService.getGradeHistory(this.data.grade.id).subscribe((data: any) => {
        this.history = data
      })
    }
  }

  onUpdateOrCreate() {
    if (this.data.grade) {
      let data = getDirtyValues(this.mainForm);
      data.author = localStorage.getItem('fullname')!
      this.gradeService.editGrade(this.data.grade.id, data).subscribe(() => {
        this.dialogRef.close();
      });
    }
    if (!this.data.grade) {
      this.gradeService.addGrade({
        userId: this.data.student?.id,
        courseId: this.data.course.id,
        description: this.mainForm.value.description,
        value: this.mainForm.value.value,
        author: localStorage.getItem('fullname')!
      }).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  onDelete() {
    if (this.data.grade) {
      this.gradeService.deleteGrade(this.data.grade.id).subscribe(
        () => {
          this.dialogRef.close(true);
        }
      );
    }
  }

  getDate(date: string) {
    return new Date(date).toLocaleString()
  }

  private buildForm() {
    this.mainForm = this.fb.group({
      description: [
        {
          value: this.data.grade?.description || '',
          disabled: !this.data.student,
        },
        !this.data.grade ? Validators.required : []
      ],
      value: [
        {
          value: this.data.grade?.value || '',
          disabled: !this.data.student,
        },
        !this.data.grade ? Validators.required : []
      ],
      author: [{ value: this.data.grade?.author || '', disabled: true }],
    });
  }
}
