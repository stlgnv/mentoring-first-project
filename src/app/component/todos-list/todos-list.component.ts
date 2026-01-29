import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../../todos-api.service';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodosService } from '../../todos.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoDialogComponent } from './create-todo-form/create-todo-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ICreateTodo {
  title: string;
  userId: number;
  completed: boolean;
}

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  standalone: true,
  imports: [
    NgFor,
    TodoCardComponent,
    AsyncPipe,
    MatIcon,
    MatIconModule,
    MatButtonModule,
    MatTooltip,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);
  readonly todosService = inject(TodosService);
  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.todosService.setTodos(response);
    });
  }

  public deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }

  editTodo(todo: any) {
    this.todosService.editTodo(todo);
  }

  openCreateTodosDialog(): void {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent);

    dialogRef.afterClosed().subscribe((newTodo: ICreateTodo | undefined) => {
      if (!newTodo) {
        this.snackBar.open('Отмена добавления!', 'ok', { duration: 3000 });
        return;
      }

      const isCreated = this.todosService.createTodo(newTodo);

      if (isCreated) {
        this.snackBar.open('Задача добавлена', 'ok', { duration: 3000 });
      } else {
        this.snackBar.open('Такая задача уже существует', 'ok', {
          duration: 3000,
        });
      }
    });
  }
}
