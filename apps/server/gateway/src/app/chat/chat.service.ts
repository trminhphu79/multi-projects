import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE_PATTERN_CHAT } from '@server/shared/message-pattern';
import { SendMessageDto } from '@server/shared/dtos/message';

@Injectable()
export class ChatService {
  constructor(
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy
  ) {}

  sendMessageToChat(payload: SendMessageDto) {
    return this.natsClient.send(MESSAGE_PATTERN_CHAT.SEND, payload);
  }
}
