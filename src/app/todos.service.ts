import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "./component/todos-list/todos-list.component";

@Injectable ({providedIn: "root"})
export class TodosService {
    private todoSubject$ = new BehaviorSubject<Todo[]>([]);
    todos$ = this.todoSubject$.asObservable();
    
    setUsers(todos: Todo[]) {
        this.todoSubject$.next(todos);
    }

    editTodo(editedTodo: Todo) {
        this.todoSubject$.next(
            this.todoSubject$.value.map(
                todo =>  todo.id === editedTodo.id ? editedTodo : todo
            )
        )
    }

    createTodo(todo: Todo) {
        this.todoSubject$.next (
            [...this.todoSubject$.value, todo]
        )
    }

    deleteTodo(id: number) {
        this.todoSubject$.next (
            this.todoSubject$.value.filter ((item: Todo) => id === item.id ? false : true)
        )
    }
}