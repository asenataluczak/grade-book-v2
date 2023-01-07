import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { GradesStudentComponent } from "./components/dashboard/grades-student/grades-student.component";
import { GradesTeacherComponent } from "./components/dashboard/grades-teacher/grades-teacher.component";
import { UsersComponent } from "./components/dashboard/users/users.component";
import { WelcomeComponent } from "./components/dashboard/welcome/welcome.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard, NotAuthGuard } from "./guards/auth.guard";
import { StudentGuard } from "./guards/student.guard";
import { TeacherGuard } from "./guards/teacher.guard";

export const APP_ROUTES: Routes = [{
  path: '', pathMatch: 'full', redirectTo: 'dashboard'
}, {
  path: 'login', component: LoginComponent,
  canActivate: [NotAuthGuard],
}, {
  path: 'register', component: RegisterComponent,
  canActivate: [NotAuthGuard],
}, {
  path: 'dashboard', component: DashboardComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      outlet: 'dashboard',
      component: WelcomeComponent,
    }, {
      path: 'users',
      outlet: 'dashboard',
      canActivate: [AdminGuard],
      component: UsersComponent,
    },
    {
      path: 'grades-student',
      outlet: 'dashboard',
      canActivate: [StudentGuard],
      component: GradesStudentComponent,
    },
    {
      path: 'grades-teacher',
      outlet: 'dashboard',
      canActivate: [TeacherGuard],
      component: GradesTeacherComponent,
    }
  ]
}]
