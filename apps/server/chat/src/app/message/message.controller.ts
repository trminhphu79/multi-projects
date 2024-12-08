import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MESSAGE_PATTERN_CHAT } from '@server/shared/message-pattern';
import { SendMessageDto } from '@server/shared/dtos/message';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private service: MessageService) {}

  @MessagePattern(MESSAGE_PATTERN_CHAT.SEND)
  send(payload: SendMessageDto) {
    console.log(
      `Message received from ${payload.senderId}: ${payload.message}`
    );
    return this.service.send(payload);
  }

  @MessagePattern(MESSAGE_PATTERN_CHAT.PAGING)
  paging(payload: any) {
    return [];
  }

  @MessagePattern(MESSAGE_PATTERN_CHAT.DELETE)
  delete(payload: any) {
    return [];
  }
}
