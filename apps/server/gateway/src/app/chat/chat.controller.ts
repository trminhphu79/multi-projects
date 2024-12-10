import { Inject, Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  SOCKET_CHAT_PATTERN,
  SOCKET_CONVERSATION_PATTERN,
} from '@server/shared/socket-pattern';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE_PATTERN_CHAT } from '@server/shared/message-pattern';
import { catchError, EMPTY, tap } from 'rxjs';
import {
  NewMessageDto,
  InteractionMessageDto,
} from '@server/shared/dtos/message';
import { JoinRoomDto, LeaveRoomDto } from '@server/shared/dtos/conversation';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor(
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy
  ) {}

  private userRooms: Map<string, string[]> = new Map();
  handleConnection(client: Socket) {
    Logger.log(`Socket --- Client connected: ${client.id}`);
    this.userRooms.set(client.id, []);
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Socket --- Client disconnected: ${client.id}`);
    this.userRooms.delete(client.id);
  }

  @SubscribeMessage(SOCKET_CONVERSATION_PATTERN.JOIN_ROOM)
  handleJoinRoom(client: Socket, { roomId }: JoinRoomDto) {
    Logger.log(`Socket --- Client ${client.id} joining room: ${roomId}`);
    client.join(roomId);

    const rooms = this.userRooms.get(client.id) || [];
    this.userRooms.set(client.id, [...rooms, roomId]);
    client.to(roomId).emit(SOCKET_CONVERSATION_PATTERN.USER_JOINED, {
      userId: client.id,
      roomId,
    });
  }

  @SubscribeMessage(SOCKET_CONVERSATION_PATTERN.LEAVE_ROOM)
  handleLeaveRoom(client: Socket, { roomId }: LeaveRoomDto) {
    Logger.log(`Socket --- Client ${client.id} leaving room: ${roomId}`);
    client.leave(roomId);
    const rooms = this.userRooms.get(client.id) || [];
    this.userRooms.set(
      client.id,
      rooms.filter((r) => r !== roomId)
    );
    client.to(roomId).emit(SOCKET_CONVERSATION_PATTERN.USER_LEFT, {
      userId: client.id,
      roomId,
    });
  }

  @SubscribeMessage(SOCKET_CHAT_PATTERN.SEND_MESSAGE)
  handleSendMessage(
    client: Socket,
    { roomId, message, senderId }: NewMessageDto
  ) {
    Logger.log(`Socket --- Message from ${client.id} to room ${roomId}: ${message}`);

    const response = {
      message,
      senderId,
      clientId: client.id,
    };
    this.natsClient
      .emit(MESSAGE_PATTERN_CHAT.SEND_MESSAGE, {})
      .pipe(
        catchError((error) => {
          this.server
            .to(roomId)
            .emit(SOCKET_CHAT_PATTERN.SEND_MESSAGE_FAIL, response);
          return EMPTY;
        }),
        tap((response) => {
          this.server
            .to(roomId)
            .emit(SOCKET_CHAT_PATTERN.NEW_MESSAGE, response);
        })
      )
      .subscribe();
  }

  @SubscribeMessage(SOCKET_CHAT_PATTERN.SEND_INTERACTION)
  handleInteractMessage(
    client: Socket,
    { roomId, interactionKey, senderId }: InteractionMessageDto
  ) {
    Logger.log(
      `Socket --- Interaction from ${client.id} to room ${roomId}: ${interactionKey}`
    );
    const resposne = {
      roomId,
      interactionKey,
      senderId: senderId,
      clientId: client.id,
    };
    this.natsClient
      .emit(MESSAGE_PATTERN_CHAT.INTERACTION, {})
      .pipe(
        catchError((error) => {
          this.server
            .to(roomId)
            .emit(SOCKET_CHAT_PATTERN.SEND_INTERACTION_FAIL, resposne);
          return EMPTY;
        }),
        tap((response) => {
          this.server
            .to(roomId)
            .emit(SOCKET_CHAT_PATTERN.NEW_INTERACTION, resposne);
        })
      )
      .subscribe();
  }
}
