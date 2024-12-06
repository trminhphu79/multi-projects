import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    AuthModule,
    ChatModule,
    ProfileModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
