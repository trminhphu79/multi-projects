import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const socketConfig: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    autoConnect: false,
    reconnectionDelay: 5000
  },
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    importProvidersFrom(SocketIoModule.forRoot(socketConfig)),
  ],
};
