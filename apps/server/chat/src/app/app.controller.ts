import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {

  private chatMessages: { sender: string; message: string }[] = [];
  @MessagePattern('chat.message')
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
