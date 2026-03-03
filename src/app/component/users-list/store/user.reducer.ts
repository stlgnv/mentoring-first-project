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

export const userReducer = createReducer<UsersState>(
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
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  })),

  on(UsersActions.create, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(UsersActions.delete, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
  })),
);
