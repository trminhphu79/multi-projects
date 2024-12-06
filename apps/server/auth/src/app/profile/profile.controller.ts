import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateProfileDto } from '@server/shared/dtos/profile';
import { MESSAGE_PATTERN_PROFILE } from '@server/shared/message-pattern';
import { ProfileService } from './profile.service';
import { map } from 'rxjs';

@Controller()
export class ProfileController {
  constructor(private service: ProfileService) {}

  @MessagePattern({ cmd: MESSAGE_PATTERN_PROFILE.UPDATE })
  updateProfile(body: UpdateProfileDto) {
    return this.service.updateOne(body).pipe(
      map((response) => {
        if (response[0] > 0) {
          return {
            message: 'Update successfully!!',
            data: response,
          };
        }
        return {
          message: 'Update failed!!',
          data: null,
        };
      })
    );
  }
}
