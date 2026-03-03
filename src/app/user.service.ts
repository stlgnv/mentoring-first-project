import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  public readonly user$: Observable<CurrentUser | null> =
    this.userSubject$.asObservable();

  private user: CurrentUser = {
    name: 'Ильнур',
    email: 'Ряжапов',
    isAdmin: null,
  };

  loginAsAdmin(): void {
    this.userSubject$.next({ ...this.user, isAdmin: true });
  }

  loginAsUser(): void {
    this.userSubject$.next({ ...this.user, isAdmin: false });
  }

  get isAdmin(): boolean {
    return !!this.userSubject$.value?.isAdmin;
  }

  logout(): void {
    this.userSubject$.next(null);
  }
}
