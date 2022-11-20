import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users = [{ id: 123, fullname: 'asdas sdas', email: 'email', role: 0, active: true }, { id: 123, fullname: 'asdas sdas', email: 'email', role: 0, active: true }];

  constructor(public dialog: MatDialog) { }

  openAddOrEditUserDialog(user?: any) {
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
