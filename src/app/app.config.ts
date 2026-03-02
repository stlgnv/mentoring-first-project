import { ApplicationConfig, LOCALE_ID, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import localeRu from '@angular/common/locales/ru';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import { provideStore } from '@ngrx/store';
import { userReducer } from './component/users-list/store/user.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { loadUsers$ } from './component/users-list/store/user.effect';
import { loadTodos$ } from './component/todos-list/store/todo.effect';
import { todoReducer } from './component/todos-list/store/todo.reducer';

registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    provideStore({
      users: userReducer,
      todos: todoReducer,
    }),
    provideEffects({ loadUsers$, loadTodos$ }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
