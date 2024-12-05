import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private connectedClients: Map<string, Socket> = new Map();
  constructor(private readonly gatewayService: ChatService) {}

  // Handle new WebSocket connections
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connectedClients.set(client.id, client);
  }
  // Handle WebSocket disconnections
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }
  // Listen for "sendMessage" events from WebSocket clients
  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { sender: string; message: string }) {
    console.log(`Message received from ${payload.sender}: ${payload.message}`);
    // Forward the message to the Chat service via NATS
    this.gatewayService.sendMessageToChat(payload).subscribe((response) => {
        console.log("Value received from chat service: ", response)
      this.server.emit('newMessage', response);
    });
  }
}