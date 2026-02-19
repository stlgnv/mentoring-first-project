import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICreateTodo, Todo } from './component/todos-list/todos-list.component';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private readonly todoSubject$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todoSubject$.asObservable();

  setTodos(todos: Todo[]): void {
    this.todoSubject$.next(todos.slice(0, 10));
  }

  editTodo(editedTodo: Todo): void {
    this.todoSubject$.next(
      this.todoSubject$.value.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo,
      ),
    );
  }

  deleteTodo(id: number): void {
    this.todoSubject$.next(
      this.todoSubject$.value.filter((item: Todo) =>
        id === item.id ? false : true,
      ),
    );
  }

  createTodo(newTodo: ICreateTodo): boolean {
    const exists: boolean = this.todoSubject$.value.some(
      (t) => t.title === newTodo.title && t.userId === newTodo.userId,
    );

    if (exists) return false;

    const todoWithId: Todo = {
      ...newTodo,
      id: Date.now(),
    };

    this.todoSubject$.next([...this.todoSubject$.value, todoWithId]);
    return true;
  }
}
