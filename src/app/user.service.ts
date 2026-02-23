import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CurrentUser {
  name: string;
  email: string;
  isAdmin: null | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userSubject$: BehaviorSubject<CurrentUser | null> =
    new BehaviorSubject<CurrentUser | null>(null);
  public readonly user$ = this.userSubject$.asObservable();

  private user: CurrentUser = {
    name: 'Ильнур',
    email: 'Ряжапов',
    isAdmin: null,
  };

  loginAsAdmin() {
    this.userSubject$.next({ ...this.user, isAdmin: true });
  }

  loginAsUser() {
    this.userSubject$.next({ ...this.user, isAdmin: false });
  }

  get isAdmin() {
    return this.userSubject$.value?.isAdmin;
  }

  logout() {
    this.userSubject$.next(null);
  }
}
