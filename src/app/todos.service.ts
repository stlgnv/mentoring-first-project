import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "./component/todos-list/todos-list.component";

@Injectable ({providedIn: "root"})
export class TodosService {
    private todoSubject$ = new BehaviorSubject<Todo[]>([]);
    todos$ = this.todoSubject$.asObservable();
    
    setUsers(todos: Todo[]): void {
        this.todoSubject$.next(todos);
    }

    editTodo(editedTodo: Todo): void {
        this.todoSubject$.next(
            this.todoSubject$.value.map(
                todo =>  todo.id === editedTodo.id ? editedTodo : todo
            )
        )
    }

    createTodo(todo: Todo): void {
        const existingTodo = this.todoSubject$.value.find(
            (currentElement) => currentElement.title === todo.title
        )

        if(existingTodo !== undefined) {
            alert('Такой текст уже зарегестрирован');
        } else {
            this.todoSubject$.next ([...this.todoSubject$.value, todo]);
            alert('НОВАЯ ЗАДАЧА ДОБАВЛЕНА')
        }

        
    }

    deleteTodo(id: number): void {
        this.todoSubject$.next(
            this.todoSubject$.value.filter((item: Todo) => id === item.id ? false : true)
        )
    }
}