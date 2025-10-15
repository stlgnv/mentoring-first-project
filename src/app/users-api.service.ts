import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "./component/users-list/users-list.component";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UsersApiService {
    readonly apiService = inject(HttpClient);

    getUsers(): Observable<User[]> {
        return this.apiService.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}