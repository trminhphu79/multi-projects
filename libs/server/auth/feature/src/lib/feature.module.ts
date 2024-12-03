import { NatsClientModule } from '@server/shared/nats-client';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
  imports: [NatsClientModule],
})
export class AuthFeatureModule {}
