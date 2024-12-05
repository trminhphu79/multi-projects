import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FeatureBAction } from '../feature-b/store/feature-b.action';
import { FeatureAAction } from './store/feature-a.action';
import { FeatureAService } from './feature-a.service';
import { BookBsStore } from '../feature-b/signal-store/feature-b.signal.store';

@Component({
  selector: 'app-feature-a',
  imports: [CommonModule, RouterLink],
  providers: [FeatureAService],
  templateUrl: './feature-a.component.html',
  styleUrl: './feature-a.component.css',
  standalone: true,
})
export class FeatureAComponent {
  store: Store<{ featureA: number; featureB: number }> = inject(Store);
  countA$: Observable<number> = this.store.select('featureA');
  countB$: Observable<number> = this.store.select('featureB');


  increaseValueAStore() {
    this.store.dispatch(FeatureAAction.increment());
  }

  increaseValueBStore() {
    this.store.dispatch(FeatureBAction.increment());
  }
}
