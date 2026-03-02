import { createReducer, on } from '@ngrx/store';
import { User } from '../users-list.component';
import { UsersActions } from './user.actions';

export interface UsersState {
  users: User[];
  loading: boolean;
  error?: string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
};

export const userReducer = createReducer(
  initialState,

  on(UsersActions.load, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(UsersActions.loadSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),

  on(UsersActions.loadFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UsersActions.edit, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => {
      if (u.id === user.id) {
        return user;
      } else {
        return u;
      }
    }),
  })),

  on(UsersActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user],
  })),

  on(UsersActions.delete, (state, payload) => ({
    ...state,
    users: state.users.filter((user) => user.id !== payload.id),
  })),
);
