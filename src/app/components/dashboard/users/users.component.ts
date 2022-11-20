import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users = [{ id: 123, fullname: 'asdas sdas', email: 'email', role: 0, active: true }, { id: 123, fullname: 'asdas sdas', email: 'email', role: 0, active: true }];

  openAddOrEditUserDialog(user?: any) {
  }

  deleteUser(userId: any) {
  }

}
