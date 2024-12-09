import { Injectable, Inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import {
  SOCKET_CHAT_PATTERN,
  SOCKET_CONVERSATION_PATTERN,
} from '@server/shared/socket-pattern';
import { ISocketAdapter } from './socket.model';
// import { ENV_CONFIG, EnvironmentConfig } from './env-config'; // Inject environment configs

@Injectable({
  providedIn: 'root',
})
export class SocketAdapterService implements ISocketAdapter {
  private socket!: Socket;

  /**
   * Connect to the socket server
   */
  connect(): void {
    if (!this.socket || !this.socket.connected) {
      this.socket = io('http://localhost:3000/', { transports: ['websocket'] });
      console.log('Socket connected');
    }
  }

  /**
   * Disconnect from the socket server
   */
  disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
      console.log('Socket disconnected');
    }
  }

  /**
   * Join a room
   * @param roomId Room ID to join
   */
  joinRoom(roomId: string): void {
    this.socket.emit(SOCKET_CONVERSATION_PATTERN.JOIN_ROOM, { roomId });
  }

  /**
   * Leave a room
   * @param roomId Room ID to leave
   */
  leaveRoom(roomId: string): void {
    this.socket.emit(SOCKET_CONVERSATION_PATTERN.LEAVE_ROOM, { roomId });
  }

  /**
   * Send a message to a room
   * @param roomId Room ID
   * @param message Message content
   * @param senderId Sender ID
   */
  sendMessage(roomId: string, message: string, senderId: string): void {
    this.socket.emit(SOCKET_CHAT_PATTERN.SEND_MESSAGE, {
      roomId,
      message,
      senderId,
    });
  }

  /**
   * Send interaction to a room
   * @param roomId Room ID
   * @param interactionKey Interaction type
   * @param senderId Sender ID
   */
  sendInteraction(
    roomId: string,
    interactionKey: string,
    senderId: string
  ): void {
    this.socket.emit(SOCKET_CHAT_PATTERN.SEND_INTERACTION, {
      roomId,
      interactionKey,
      senderId,
    });
  }

  /**
   * Listen for an event
   * @param eventName Name of the event
   * @returns Observable for the event
   */
  listen<T>(eventName: string): Observable<T> {
    const subject = new Subject<T>();
    this.socket.on(eventName, (data: T) => {
      subject.next(data);
    });
    return subject.asObservable();
  }

  /**
   * Remove listener for a specific event
   * @param eventName Name of the event
   */
  removeListener(eventName: string): void {
    this.socket.off(eventName);
  }
}
