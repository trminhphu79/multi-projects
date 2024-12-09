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
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import {
  SOCKET_ADAPTER,
  SocketAdapterService,
} from '@client/shared/socket-adaper';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    providerAppState(INITIAL_APP_STATE),
    provideAnimations(),
    importProvidersFrom(provideSocketIo(), MessageService),
    provideRouter(appRoutes, withViewTransitions()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: SOCKET_ADAPTER,
      useClass: SocketAdapterService,
    },
  ],
};
