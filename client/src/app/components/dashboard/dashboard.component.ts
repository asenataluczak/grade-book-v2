import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { Roles } from 'src/app/utils/roles.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userName;
  userRole;
  userRoleParsed;
  Roles = Roles;

  constructor(private authService: AuthService, private router: Router) {
    this.userName = localStorage.getItem('fullname')
    this.userRole = +localStorage.getItem('role')!
    this.userRoleParsed = this.parseRole(this.userRole)
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login')
    })
  }

  parseRole(role: any) {
    return this.Roles[role]
  }

}
