import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NatsClientModule } from '@server/shared/nats-client';

@Module({
  providers: [],
  controllers: [AuthController, NatsClientModule]
})
export class AuthModule {}
