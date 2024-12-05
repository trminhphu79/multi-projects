import {
  mergeApplicationConfig,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// const socketConfig: SocketIoConfig = {
//   url: 'http://localhost:3000',
//   options: {},
// };

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // importProvidersFrom(SocketIoModule.forRoot(socketConfig)),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
