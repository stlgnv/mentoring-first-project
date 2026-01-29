import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { IUser, User } from '../users-list.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RemoveDashesPipe } from '../../../pipes/remove-daches.pipe';
import { UpperCasePipe } from '@angular/common';
import { CartHoverDirective } from '../../../directives/cart-hover.directive';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    RemoveDashesPipe,
    UpperCasePipe,
    CartHoverDirective,
    MatTooltip,
  ],
})
export class UserCardComponent {
  @Input() user!: User;

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<IUser>();

  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '600px',
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      console.log('The dialog was closed');
      if (result) {
        this.deleteUser.emit(this.user.id);
        this.snackBar.open('Пользователь удалён!', 'ok', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Отмена удаления!', 'ok', {
          duration: 3000,
        });
      }
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((editResult: User | undefined) => {
      console.log('The dialog was closed, Value:', editResult);
      if (editResult) {
        this.editUser.emit(editResult);
        this.snackBar.open('Пользователь изменен!', 'ok', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Отмена изменения!', 'ok', {
          duration: 3000,
        });
      }
    });
  }
}
