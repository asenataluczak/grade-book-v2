import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users$: Observable<Array<User>>;

  constructor(public dialog: MatDialog, private userService: UserService) {
    this.users$ = this.userService.getUsers();
  }

  openAddOrEditUserDialog(user?: User) {
  }

  deleteUser(userId: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log('confirmed')
      }
    })
  }

}
