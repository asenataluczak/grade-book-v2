import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMAIL_PATTERN } from 'src/app/utils/utils.constants';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  mainForm!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  onSubmit() {
    this.authService.login(this.mainForm.value.email, this.mainForm.value.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard')
      },
      error: (response: any) => {
        this.error = response.error.error || response.statusText
      }
    })
  }

  private buildForm() {
    this.mainForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: ['', [Validators.required]],
    });
  }
}
