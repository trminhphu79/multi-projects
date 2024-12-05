import { Controller, Inject, Get, Logger, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, tap } from 'rxjs';
import { CreateDto } from './dto/create.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy
  ) {}

  @Get()
  createPayment() {
    return this.natsClient.send({ cmd: 'CREATE_DTO' }, { name: 'TEST' }).pipe(
      catchError((error) => {
        Logger.error('Get Action: Create DTO error!!');
        return error;
      }),
      tap((data) => {
        Logger.log('Get Action: Create DTO successfully!!', data);
      })
    );
  }

  @Post()
  createUser(@Body() payload: CreateDto) {
    return this.natsClient.send({ cmd: 'CREATE_ACCOUNT' }, payload).pipe(
      catchError((error) => {
        Logger.error('Get Action: CREATE_ACCOUNT error!!');
        return error;
      }),
      tap((data) => {
        Logger.log('Get Action: CREATE_ACCOUNT successfully!!', data);
      })
    );
  }
}
