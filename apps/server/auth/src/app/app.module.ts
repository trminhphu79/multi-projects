import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Account } from './entities/account.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123123anh',
      database: 'chat-local',
      models: [Account],
    }),
    SequelizeModule.forFeature([Account]), // Register models
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
