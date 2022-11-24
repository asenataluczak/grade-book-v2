import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { GradesStudentComponent } from "./components/dashboard/grades-student/grades-student.component";
import { UsersComponent } from "./components/dashboard/users/users.component";
import { WelcomeComponent } from "./components/dashboard/welcome/welcome.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

export const APP_ROUTES: Routes = [{
  path: '', pathMatch: 'full', redirectTo: 'dashboard'
}, {
  path: 'login', component: LoginComponent
}, {
  path: 'register', component: RegisterComponent
}, {
  path: 'dashboard', component: DashboardComponent,
  children: [
    {
      path: '',
      outlet: 'dashboard',
      component: WelcomeComponent,
    }, {
      path: 'users',
      outlet: 'dashboard',
      component: UsersComponent,
    },
    {
      path: 'grades-student',
      outlet: 'dashboard',
      component: GradesStudentComponent,
    }
  ]
}]
