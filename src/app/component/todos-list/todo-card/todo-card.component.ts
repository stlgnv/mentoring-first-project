import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  @Input() todo!: Todo;

  @Output()
  deleteTodo = new EventEmitter<number>();

  @Output()
  editTodo = new EventEmitter();

  readonly dialog = inject(MatDialog);

  private snackBar = inject(MatSnackBar);

  onDeleteTodo(todoId: number) {
    this.deleteTodo.emit(todoId);
  }

  openDialog(): void {
    const dialofRef = this.dialog.open(EditTodoDialogComponent, {
      data: { todo: this.todo },
    });

    dialofRef.afterClosed().subscribe((editResult: Todo | undefined) => {
      console.log('The dialog was closed, Value:', editResult);
      if (editResult) {
        this.editTodo.emit(editResult);
        this.snackBar.open('Задача изменена', 'ok', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Отмена изменеия!', 'ok', {
          duration: 3000,
        });
      }
    });
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
      width: '600px',
      data: { todo: this.todo },
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      console.log('The dialog was closed');
      if (result) {
        this.deleteTodo.emit(this.todo.id);
        this.snackBar.open('Задача удалена!', 'ok', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Отмена удаления!', 'ok', {
          duration: 3000,
        });
      }
    });
  }
}
