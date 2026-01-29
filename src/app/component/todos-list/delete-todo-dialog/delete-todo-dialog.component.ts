import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ICreateTodo } from '../todos-list.component';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-delete-todo-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatTooltip,
  ],
  templateUrl: './delete-todo-dialog.component.html',
  styleUrl: './delete-todo-dialog.component.scss',
})
export class DeleteTodoDialogComponent {
  public readonly data = inject<{ todo: ICreateTodo }>(MAT_DIALOG_DATA);
  readonly dialog = inject(MatDialog);
}
