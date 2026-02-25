import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateUserDialogComponent } from './create-user-form/create-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartShadowDirective } from '../../directives/cart-shadow.directive';
import { MatTooltip } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/user.actions';
import { selectUsers } from './store/users.selectors';

export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}

export interface ICreateUser {
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface IUser extends ICreateUser {
  id: number;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [
    NgFor,
    UserCardComponent,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    CartShadowDirective,
    MatTooltip,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private readonly store = inject(Store);

  public readonly users$ = this.store.select((state) => state.users.users);

  ngOnInit() {
    this.store.dispatch(UsersActions.load());
  }

  public deleteUser(id: number) {
    this.store.dispatch(UsersActions.delete({ id }));
  }

  public editUser(user: IUser) {
    this.store.dispatch(UsersActions.edit({ user }));
  }

  public createUser(user: IUser): void {
    this.store.dispatch(UsersActions.create({ user }));
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);

    dialogRef.afterClosed().subscribe((newUser: IUser | undefined) => {
      if (!newUser) {
        this.snackBar.open('Отмена добавления!', 'ok', { duration: 3000 });
        return;
      }

      this.store.dispatch(UsersActions.create({ user: newUser }));

      this.snackBar.open('Пользователь добавлен!', 'ok', { duration: 3000 });
    });
  }
}

// ngOnInit() {
//     this.usersService.loadUsers();
//     this.store.dispatch(UsersActions.set({ users }));
//   }

//   public deleteUser(id: number) {
//     this.usersService.deleteUser(id);
//     this.store.dispatch(UsersActions.delete({ id }));
//   }

//   public editUser(user: IUser) {
//     this.usersService.editUser({
//       ...user,
//     });
//     this.store.dispatch(UsersActions.edit({ user }));
//   }

//   public createUser(user: IUser): void {
//     const newUser: IUser = {
//       ...user,
//     };
//     this.usersService.createUser(newUser);
//     this.store.dispatch(UsersActions.create({ user }));
//   }

//   openCreateUserDialog(): void {
//     const dialogRef = this.dialog.open(CreateUserDialogComponent, {
//       data: {},
//     });

//     dialogRef.afterClosed().subscribe((newUser: IUser | undefined) => {
//       if (!newUser) {
//         this.snackBar.open('Отмена добавления!', 'ok', { duration: 3000 });
//         return;
//       }
//       const isCreated = this.usersService.createUser(newUser);
//       if (isCreated) {
//         this.snackBar.open('Пользователь добавлен!', 'ok', {
//           duration: 3000,
//         });
//       } else {
//         this.snackBar.open('Такой email уже зарегистрирован', 'ok', {
//           duration: 3000,
//         });
//       }
//     });
//   }
// }
