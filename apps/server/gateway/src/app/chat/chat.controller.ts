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
} from '@shared/socket-pattern';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE_PATTERN_CHAT } from '@server/shared/message-pattern';
import { catchError, EMPTY, tap } from 'rxjs';
import {
  NewMessageDto,
  InteractionMessageDto,
} from '@server/shared/dtos/message';
import { JoinRoomDto, LeaveRoomDto } from '@server/shared/dtos/conversation';
import { RoomConnectionStatus, UserConnectionStatus } from './chat.enum';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor(
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy
  ) {}

  private userRooms: Map<string, string[]> = new Map();

  private roomsMaps: Map<string, string[]> = new Map();

  private usersOnline: Map<number, { userId: number; clientId: string }> =
    new Map();

  handleConnection(client: Socket) {
    Logger.log(`Socket --- Client connected: ${client.id}`);
    this.userRooms.set(client.id, []);
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Socket --- Client disconnected: ${client.id}`);
    this.userRooms.delete(client.id);
    Array.from(this.usersOnline).forEach((u) => {
      if (u[1].clientId == client.id) {
        this.usersOnline.delete(u[1].userId);
        Logger.log(`Socket --- User Ofline: ${u[1].userId}`);
      }
    });
  }

  @SubscribeMessage(SOCKET_CONVERSATION_PATTERN.ONLINE)
  handleUserOnline(client: Socket, userId: number) {
    Logger.log(`Socket --- User Online: ${userId}`);
    this.usersOnline.set(userId, { userId, clientId: client.id });
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
    this.addClientToRoom(client, roomId);
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
    this.removeClientFromRoom(client, roomId);
    client.to(roomId).emit(SOCKET_CONVERSATION_PATTERN.USER_LEFT, {
      userId: client.id,
      roomId,
    });
  }

  @SubscribeMessage(SOCKET_CHAT_PATTERN.SEND_MESSAGE)
  handleSendMessage(client: Socket, input: NewMessageDto) {
    const isSendGroup = input.receiverIds.length > 1;
    if (isSendGroup) {
      this.handleSendGroupMessage(input);
      return;
    }
    this.handleSendPersonalMessage(client, input);
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

  private handleSendPersonalMessage(client: Socket, input: NewMessageDto) {
    const receiverId = input.receiverIds[0]; // because chat one by one only has a receiver
    Logger.log(
      `Socket --- Message from ${client.id} to room ${input.roomId}: ${input.message} -- receiver: ${receiverId}`
    );
    switch (this.checkReceiverStatus(receiverId, input.roomId)) {
      case UserConnectionStatus.ONLINE:
        this.handleSendMessageOnline(input);
        break;
      case UserConnectionStatus.OFFLINE:
        this.handleSendMessageUserOffline(input);
        Logger.warn(`Socket --- Send Message To User Offline....: `);
        break;
      case RoomConnectionStatus.RECEIVER_OFF_ROOM:
        this.handleSendMessageUserOffRoom(input);
        Logger.warn(`Socket --- Send message but user has off room!!: `);
        break;
      case RoomConnectionStatus.EMPTY:
        Logger.warn(`Socket --- Send Message To Empty Client In ROOM....: `);
        break;
    }
  }

  //TODO: Need to send message for current receiver
  private handleSendMessageOnline(payload: NewMessageDto) {
    console.log('handleSendMessageOnline');
    this.natsClient
      .emit(MESSAGE_PATTERN_CHAT.SEND_MESSAGE, payload)
      .pipe(
        catchError((error) => {
          this.server
            .to(payload.roomId)
            .emit(SOCKET_CHAT_PATTERN.SEND_MESSAGE_FAIL, payload);
          return EMPTY;
        }),
        tap(() => {
          this.server.to(payload.roomId).emit(SOCKET_CHAT_PATTERN.NEW_MESSAGE, {
            ...payload,
            content: payload.message,
          });
        })
      )
      .subscribe();
  }

  //TODO: Need to create message for conversation
  private handleSendMessageUserOffline(payload: NewMessageDto) {
    console.log('handleSendMessageUserOffline');
  }

  //TODO: Need to send message up lastmessage of conversation
  private handleSendMessageUserOffRoom(payload: NewMessageDto) {
    console.log('handleSendMessageUserOffRoom');
    this.server.to(payload.roomId).emit(SOCKET_CHAT_PATTERN.NEW_LAST_MESSAGE, {
      content: payload.message,
      conversationId: payload.roomId,
      senderId: payload.senderId,
      receiverId: payload.receiverIds[0],
      timeSend: new Date().toISOString(),
    });
  }

  private handleSendGroupMessage(payload: NewMessageDto) {
    console.log('handleSendGroupMessage: ', payload);
  }

  private isUserOnline(userId: number) {
    return this.usersOnline.get(userId);
  }

  private addClientToRoom(client: Socket, roomId: string) {
    if (!this.roomsMaps.has(roomId)) {
      this.roomsMaps.set(roomId, [client.id]);
    } else {
      const clientIds = [...this.roomsMaps.get(roomId), client.id];
      this.roomsMaps.set(roomId, clientIds);
    }
  }

  private removeClientFromRoom(client: Socket, roomId: string) {
    if (!this.roomsMaps.has(roomId)) {
      return;
    }

    const clientIds = this.roomsMaps
      .get(roomId)
      .filter((clientId) => clientId !== client.id);
    this.roomsMaps.set(roomId, clientIds);
  }

  private checkReceiverStatus(
    userId: number,
    roomId: string
  ): UserConnectionStatus | RoomConnectionStatus {
    const isOnl = this.isUserOnline(userId);
    const lengthOfRoom = this.roomsMaps.get(roomId).length;
    const isRoomEmpty = !this.roomsMaps.has(roomId) || lengthOfRoom == 0;
    const isRoomOnlyClient = lengthOfRoom == 1;
    if (!isOnl) return UserConnectionStatus.OFFLINE;
    if (isRoomEmpty) return RoomConnectionStatus.EMPTY;
    if (isRoomOnlyClient) return RoomConnectionStatus.RECEIVER_OFF_ROOM;
    return isOnl && UserConnectionStatus.ONLINE;
  }
}
