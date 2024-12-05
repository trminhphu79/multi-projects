import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FeatureAService {
  state$ = new BehaviorSubject({
    count: 0,
  });
}
