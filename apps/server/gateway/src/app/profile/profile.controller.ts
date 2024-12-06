import { Controller, Inject, Get, Logger, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, tap } from 'rxjs';
import { MESSAGE_PATTERN_PROFILE } from '@server/shared/message-pattern';
import { UpdateProfileDto } from '@server/shared/dtos/profile';

@Controller('profile')
export class ProfileController {
  constructor(
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy
  ) {}

  @Post()
  updateProfile(@Body() payload: UpdateProfileDto) {
    return this.natsClient
      .send({ cmd: MESSAGE_PATTERN_PROFILE.UPDATE }, payload)
      .pipe(
        catchError((error) => {
          Logger.error('Get Action: UPDATE_PROFILE error!!');
          return error;
        }),
        tap((data) => {
          Logger.log('Get Action: UPDATE_PROFILE successfully!!', data);
        })
      );
  }
}
