import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MESSAGE_PATTERN_CHAT } from '@server/shared/message-pattern';

@Controller()
export class MessageController {
  private chatMessages: { sender: string; message: string }[] = [];

  @MessagePattern(MESSAGE_PATTERN_CHAT.SEND)
  send(payload: { sender: string; message: string }): {
    sender: string;
    message: string;
  } {
    console.log(`Message received from ${payload.sender}: ${payload.message}`);
    this.chatMessages.push(payload);
    return payload;
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
