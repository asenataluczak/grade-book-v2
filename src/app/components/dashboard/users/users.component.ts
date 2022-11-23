import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, MatInputModule, MatFormFieldModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users$: Observable<Array<User>>;

  constructor(public dialog: MatDialog, private userService: UserService) {
    this.users$ = this.userService.getUsers();
  }

  openUserDialog(user?: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: { user },
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data && user) {
        // TODO: update user
        console.log('update user')
      }
    })
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
