import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { Roles } from "../utils/roles.enum";

@Injectable({ providedIn: 'root' })
export class StudentGuard implements CanActivate {
  roles = Roles;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<any> {
    if (+localStorage.getItem('role')! === this.roles.Student) {
      return true
    } else return false
  }
}

