import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from '@client/app-shell';
import { provideSocketIo } from '@client/provider/socket';
import { providerAppState } from '@client/provider/app-state';
import { INITIAL_APP_STATE } from './app.state';

export const appConfig: ApplicationConfig = {
  providers: [
    providerAppState(INITIAL_APP_STATE),
    provideAnimations(),
    importProvidersFrom(provideSocketIo()),
    provideRouter(appRoutes, withViewTransitions()),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
