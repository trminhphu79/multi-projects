import { Controller, Inject, Get, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, tap } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy,
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
}
