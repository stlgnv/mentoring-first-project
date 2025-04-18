import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "./component/todos-list/todos-list.component";

@Injectable({providedIn: 'root'})
export class TodosApiService {
    readonly apiService = inject(HttpClient);

    getTodos(): Observable<Todo[]> {
        return this.apiService.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    }
}