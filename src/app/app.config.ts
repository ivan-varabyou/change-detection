import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { isZoneless } from '../zone.config';

export const appConfig: ApplicationConfig = {
  providers: [
    isZoneless
      ? provideExperimentalZonelessChangeDetection()
      : provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
