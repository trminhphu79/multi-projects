import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { tap } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'CREATE_DTO' })
  getData() {
    return this.appService.getData().pipe(
      tap((response) => {
        console.log('Auth: CREATE_DTO', response);
      })
    );
  }
}
