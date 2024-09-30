import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

const isZonneless = false;
let providers: any[];
if (isZonneless) {
  providers = [provideExperimentalZonelessChangeDetection()];
} else {
  providers = [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ];
}

export const appConfig: ApplicationConfig = {
  providers,
};
