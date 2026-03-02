import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosApiService } from '../../../todos-api.service';
import { TodosActions } from './todo.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const loadTodos$ = createEffect(
  (actions$ = inject(Actions), todosApiService = inject(TodosApiService)) =>
    actions$.pipe(
      ofType(TodosActions.load),
      switchMap(() =>
        todosApiService.getTodos().pipe(
          map((todos) => TodosActions.loadSuccess({ todos })),
          catchError(() =>
            of(TodosActions.loadFailure({ error: 'ошибка загрузки' })),
          ),
        ),
      ),
    ),
  { functional: true },
);
