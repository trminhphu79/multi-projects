import { InjectionToken } from '@angular/core';
import { ISocketAdapter } from './socket.model';

export const SOCKET_ADAPTER = new InjectionToken<ISocketAdapter>(
  'SocketAdapterService'
);