import { createReducer, on } from '@ngrx/store';
import { Todo } from '../todos-list.component';
import { TodosActions } from './todo.actions';

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error?: string;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
};

export const todoReducer = createReducer(
  initialState,

  on(TodosActions.load, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(TodosActions.loadSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
  })),

  on(TodosActions.loadFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TodosActions.edit, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((u) => {
      if (u.id === todo.id) {
        return todo;
      } else {
        return u;
      }
    }),
  })),
  on(TodosActions.create, (state, payload) => ({
    ...state,
    todos: [...state.todos, payload.todo],
  })),
  on(TodosActions.delete, (state, payload) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== payload.id),
  })),
);
