import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  getData(): Observable<{ message: string }> {
    return of({ message: 'Hello API' });
  }
}
