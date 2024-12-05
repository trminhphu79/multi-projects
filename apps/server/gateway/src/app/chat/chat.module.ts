import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.controller';
import { NatsClientModule } from '@server/shared/nats-client';

@Module({
  imports: [NatsClientModule],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
