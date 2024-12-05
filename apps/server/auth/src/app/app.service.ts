import { BadRequestException, Injectable } from '@nestjs/common';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Account } from '@server/shared/entities';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Account)
    private userModel: typeof Account
  ) {}

  getData(): Observable<{ message: string }> {
    return of({ message: 'Hello API' });
  }

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
        console.log('isCreated: ', isCreated);
        if (!isCreated) {
          throwError(() => new BadRequestException('User existing!!'));
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
