import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { MESSAGE_PATTERN_AUTH } from '@server/shared/message-pattern';
import { CreateAccountDto } from '@server/shared/dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: MESSAGE_PATTERN_AUTH.CREATE })
  createAccount(body: CreateAccountDto) {
    return this.appService.createOne(body);
  }
}
