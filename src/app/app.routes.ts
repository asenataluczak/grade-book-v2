import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

export const APP_ROUTES: Routes = [{
  path: '', pathMatch: 'full', redirectTo: 'dashboard'
}, {
  path: 'login', component: LoginComponent
}, {
  path: 'register', component: RegisterComponent
}, {
  path: 'dashboard', component: DashboardComponent
}]
