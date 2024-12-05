import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ChatService {
  constructor(
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy
  ) {}
  // Forward messages to the Chat service
  sendMessageToChat(payload: { sender: string; message: string }) {
    return this.natsClient.send('chat.message', payload);
  }
}
