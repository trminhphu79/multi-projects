import { BadRequestException, Injectable } from '@nestjs/common';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Account } from '@server/shared/entity/account';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccountDto } from '@server/shared/dtos/account';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account)
    private userModel: typeof Account
  ) {}

  createOne(payload: CreateAccountDto): Observable<any> {
    return from(
      this.userModel.findOrCreate({
        where: { username: payload.username },
        defaults: {
          username: payload.username,
          password: payload.password, // Make sure to hash the password before saving
        },
      })
    ).pipe(
      switchMap((response) => {
        const [value, isCreated] = response;
        if (!isCreated) {
          return of({
            message: 'User Existing!!',
            data: payload,
          });
        }

        const reuslt = value.toJSON();
        delete reuslt.password;

        return of({
          message: 'Create successfully!!',
          data: reuslt,
        });
      })
    );
  }
}
