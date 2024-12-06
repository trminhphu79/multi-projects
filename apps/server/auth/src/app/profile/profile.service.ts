import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateProfileDto } from '@server/shared/dtos/profile';
import { Profile } from '@server/shared/entity/profile';
import { from} from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile)
    private model: typeof Profile
  ) {}

  updateOne(payload: UpdateProfileDto) {
    const payloadUpdate = { ...payload };
    delete payloadUpdate.id;
    return from(
      this.model.update(payloadUpdate, { where: { id: payload.id } })
    );
  }
}
