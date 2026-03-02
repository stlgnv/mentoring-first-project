import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersApiService } from '../../../users-api.service';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { UsersActions } from './user.actions';

export const loadUsers$ = createEffect(
  (actions$ = inject(Actions), usersApiService = inject(UsersApiService)) =>
    actions$.pipe(
      ofType(UsersActions.load),
      switchMap(() =>
        usersApiService.getUsers().pipe(
          map((users) => UsersActions.loadSuccess({ users })),
          catchError(() =>
            of(UsersActions.loadFailure({ error: 'Ошибка загрузки' })),
          ),
        ),
      ),
    ),
  { functional: true },
);
