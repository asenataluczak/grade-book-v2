import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<any> {
    return this.authService.checkIfLoggedIn().pipe(
      map((res: any) => {
        if (!res.isLoggedIn) {
          this.router.navigate(['login'])
          return false;
        } else {
          return true;
        }
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }
}

@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<any> {
    return this.authService.checkIfLoggedIn().pipe(
      map((res: any) => {
        if (res.isLoggedIn) {
          this.router.navigate(['dashboard'])
          return false;
        } else {
          return true;
        }
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }
}



