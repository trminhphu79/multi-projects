import { Observable } from 'rxjs';

export interface ISocketAdapter {
  connect(): void;
  disconnect(): void;
  online(userId: number): void;
  joinRoom(roomId: number, userId: number): void;
  leaveRoom(roomId: number, userId: number): void;
  sendMessage(roomId: number, message: string, senderId: number, receiver: number[] ): void;
  listen<T>(eventName: string): Observable<T>;
  removeListener(eventName: string): void;
}
