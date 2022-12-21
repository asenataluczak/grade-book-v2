import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasswordValidator } from 'src/app/utils/confirm-password.validator';
import { FULLNAME_PATTERN, EMAIL_PATTERN } from 'src/app/utils/utils.constants';
import { User } from 'src/app/interfaces/user.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Roles } from 'src/app/utils/roles.enum';
import { MatOptionModule } from '@angular/material/core';
import { getDirtyValues } from 'src/app/utils/utils';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatDialogModule, ReactiveFormsModule, MatButtonModule, MatOptionModule, MatSelectModule],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  mainForm!: FormGroup;
  roles = Roles;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { user: User },
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  keys(): Array<string> {
    let keys = Object.keys(this.roles);
    return keys.slice(keys.length / 2);
  }

  onSubmit() {
    let data = getDirtyValues(this.mainForm);
    if (data.hasOwnProperty('role')) {
      data.role = Roles[data.role]
    }
    if (data.hasOwnProperty('passwordAgain')) {
      delete data.passwordAgain
    }
    this.dialogRef.close(data);
  }

  private buildForm() {
    this.mainForm = this.fb.group({
      fullname: [
        this.data.user?.fullname || '',
        !this.data.user ? [Validators.required, Validators.pattern(FULLNAME_PATTERN)] : [Validators.pattern(FULLNAME_PATTERN)],
      ],
      email: [
        {
          value: this.data.user?.email || '',
          disabled: this.data.user,
        },
        !this.data.user ? [Validators.required, Validators.pattern(EMAIL_PATTERN)] : [Validators.pattern(EMAIL_PATTERN)],
      ],
      password: ['', !this.data.user ? Validators.required : []],
      passwordAgain: [
        '',
        !this.data.user
          ? [Validators.required, PasswordValidator('password')]
          : [PasswordValidator('password')],
      ],
      role: [
        this.roles[this.data.user?.role] || '',
        !this.data.user ? Validators.required : [],
      ],
    });
  }
}
