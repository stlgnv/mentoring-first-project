import { inject, Injectable } from '@angular/core';
import { ICreateUser, User } from './component/users-list/users-list.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersApiService } from './users-api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly userSubject$: BehaviorSubject<User[]> = new BehaviorSubject<
    User[]
  >([]);
  public readonly users$: Observable<User[]> = this.userSubject$.asObservable();
  private localStorageKey = 'users';
  private usersApiService = inject(UsersApiService);
  private localStorageService = inject(LocalStorageService);

  loadUsers(): void {
    const storedUsers: User[] | null = this.localStorageService.getItem(
      this.localStorageKey,
    );
    storedUsers
      ? this.userSubject$.next(storedUsers)
      : this.usersApiService
          .getUsers()
          .subscribe((data: User[]) => this.setUsers(data));
  }

  setUsers(users: User[]): void {
    this.userSubject$.next(users);
    this.localStorageService.saveItem(this.localStorageKey, users);
  }

  editUser(editedUser: User): void {
    const updatedUsers: User[] = this.userSubject$.value.map((user) =>
      user.id === editedUser.id ? editedUser : user,
    );

    this.userSubject$.next(updatedUsers);
    this.localStorageService.saveItem(this.localStorageKey, updatedUsers);
  }

  createUser(user: ICreateUser): boolean {
    const existingUser: ICreateUser | undefined = this.userSubject$.value.find(
      (currentElement) => currentElement.email === user.email,
    );

    if (existingUser) {
      return false;
    }
    const newUser: User = {
      ...user,
      id: Date.now(),
    };

    const newUsers: User[] = [...this.userSubject$.value, newUser];

    this.userSubject$.next(newUsers);
    this.localStorageService.saveItem(this.localStorageKey, newUsers);

    return true;
  }

  deleteUser(id: number): void {
    const filteredUsers: User[] = this.userSubject$.value.filter(
      (item: User) => item.id !== id,
    );

    this.userSubject$.next(filteredUsers);
    this.localStorageService.saveItem(this.localStorageKey, filteredUsers);
  }
}
