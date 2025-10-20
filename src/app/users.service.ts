import { Injectable } from "@angular/core";
import { User } from "./component/users-list/users-list.component";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: "root"})
export class UsersService {
    private userSubject$ = new BehaviorSubject<User[]>([]);
    users$ = this.userSubject$.asObservable();

    setUsers(users: User[]): void {
        this.userSubject$.next(users);
    }

    editUser(editedUser: User): void {
        this.userSubject$.next(
            this.userSubject$.value.map(
                user => user.id === editedUser.id ? editedUser : user
            )
        )
    }

    createUser(user: User): void {
        this.userSubject$.next(
            [...this.userSubject$.value, user]
        )
    }

    deleteUser(id: number): void {
        this.userSubject$.next(
            this.userSubject$.value.filter((item: User) => id === item.id ? false : true)
        )
    }
}