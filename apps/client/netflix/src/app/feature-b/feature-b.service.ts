import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FeatureBService {
  state$ = new BehaviorSubject({
    count: 0,
  });
}
