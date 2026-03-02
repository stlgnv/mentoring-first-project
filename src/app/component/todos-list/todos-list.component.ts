import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../../todos-api.service';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoDialogComponent } from './create-todo-form/create-todo-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { TodosActions } from './store/todo.actions';

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
  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select((state) => state.todos.todos);

  ngOnInit() {
    this.store.dispatch(TodosActions.load());
  }

  public deleteTodo(id: number) {
    this.store.dispatch(TodosActions.delete({ id }));
  }

  editTodo(todo: any) {
    this.store.dispatch(TodosActions.edit({ todo }));
  }

  openCreateTodosDialog(): void {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent);

    dialogRef.afterClosed().subscribe((newTodo: Todo | undefined) => {
      if (!newTodo) {
        this.snackBar.open('Отмена добавления!', 'ok', { duration: 3000 });
        return;
      }

      this.store.dispatch(TodosActions.create({ todo: newTodo }));
    });
  }
}
