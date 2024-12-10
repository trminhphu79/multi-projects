import { Observable } from 'rxjs';

export interface ISocketAdapter {
  connect(): void;
  disconnect(): void;
  joinRoom(roomId: string, userId: number): void;
  leaveRoom(roomId: string, userId: number): void;
  sendMessage(roomId: string, message: string, senderId: string): void;
  listen<T>(eventName: string): Observable<T>;
  removeListener(eventName: string): void;
}
