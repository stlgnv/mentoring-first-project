import { inject, Injectable } from '@angular/core';
import { IUser, User } from './component/users-list/users-list.component';
import { BehaviorSubject } from 'rxjs';
import { UsersApiService } from './users-api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private userSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.userSubject$.asObservable();
  private localStorageKey = 'users';
  private usersApiService = inject(UsersApiService);
  private localStorageService = inject(LocalStorageService);

  loadUsers(): void {
    const storedUsers = this.localStorageService.getUsersFromLocalStorage(
      this.localStorageKey,
    );
    storedUsers
      ? this.userSubject$.next(storedUsers)
      : this.usersApiService
          .getUsers()
          .subscribe((data) => this.setUsers(data));
  }

  setUsers(users: User[]): void {
    this.userSubject$.next(users);
    this.localStorageService.saveUsersToLocalStorage(
      this.localStorageKey,
      users,
    );
  }

  editUser(editedUser: User): void {
    const updatedUsers = this.userSubject$.value.map((user) =>
      user.id === editedUser.id ? editedUser : user,
    );

    this.userSubject$.next(updatedUsers);
    this.localStorageService.saveUsersToLocalStorage(
      this.localStorageKey,
      updatedUsers,
    );
  }

  createUser(user: IUser): boolean {
    const existingUser = this.userSubject$.value.find(
      (currentElement) => currentElement.email === user.email,
    );

    if (existingUser) {
      return false;
    }

    const newUsers = [...this.userSubject$.value, user as User];

    this.userSubject$.next(newUsers);
    this.localStorageService.saveUsersToLocalStorage(
      this.localStorageKey,
      newUsers,
    );
    console.log('Saving users:', newUsers);

    return true;
  }

  deleteUser(id: number): void {
    const filteredUsers = this.userSubject$.value.filter(
      (item: User) => item.id !== id,
    );

    this.userSubject$.next(filteredUsers);
    this.localStorageService.saveUsersToLocalStorage(
      this.localStorageKey,
      filteredUsers,
    );
  }
}
