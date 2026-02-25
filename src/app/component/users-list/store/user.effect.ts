import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActions } from './user.actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { UsersApiService } from '../../../users-api.service';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private usersApiService = inject(UsersApiService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.load),
      switchMap(() =>
        this.usersApiService.getUsers().pipe(
          map((users) => UsersActions.loadSuccess({ users })),
          catchError(() =>
            of(UsersActions.loadFailure({ error: 'Ошибка загрузки' })),
          ),
        ),
      ),
    ),
  );
}
