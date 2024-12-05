import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MESSAGE_PATTERN_CHAT } from '@server/shared/message-pattern';
@Controller()
export class AppController {
  private chatMessages: { sender: string; message: string }[] = [];

  @MessagePattern(MESSAGE_PATTERN_CHAT.SEND)
  handleChatMessage(payload: { sender: string; message: string }): {
    sender: string;
    message: string;
  } {
    console.log(`Message received from ${payload.sender}: ${payload.message}`);
    // Store the message (or perform other business logic)
    this.chatMessages.push(payload);
    // Return the message back to the Gateway
    return payload;
  }
}
