import { ApplicationConfig, LOCALE_ID, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import localeRu from '@angular/common/locales/ru';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'ru-RU' },
  ],
};
