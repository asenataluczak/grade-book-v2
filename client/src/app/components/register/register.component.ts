import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMAIL_PATTERN, FULLNAME_PATTERN } from 'src/app/utils/utils.constants';
import { PasswordValidator } from 'src/app/utils/confirm-password.validator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink,MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule,
    FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  mainForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  onSubmit() {

  }

  private buildForm() {
    this.mainForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.pattern(FULLNAME_PATTERN)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: ['', [Validators.required]],
      passwordAgain: ['', [Validators.required, PasswordValidator('password')]],
    });
  }
}
