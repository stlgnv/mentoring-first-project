import { createSelector } from '@ngrx/store';
import { Todo } from '../todos-list.component';

export interface TodoState {
  todos: Todo[];
}

export interface TodosAppState {
  todos: TodoState;
}

export const selectTodosFeature = (state: TodosAppState) => state.todos;

export const selectTodos = createSelector(
  selectTodosFeature,
  (state: TodoState) => state.todos,
);
