import { CommonModule, JsonPipe } from '@angular/common';
import {
  afterRender,
  AfterViewInit,
  Component,
  importProvidersFrom,
  inject,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { FeatureBAction } from './store/feature-b.action';
import { RouterLink } from '@angular/router';
import { FeatureAAction } from '../feature-a/store/feature-a.action';
import { FeatureBService } from './feature-b.service';
import { FeatureAService } from '../feature-a/feature-a.service';
import { BookBsStore } from './signal-store/feature-b.signal.store';
import { FeatureAComponent } from '../feature-a/feature-a.component';
import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feature-b',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [FeatureBService, BookBsStore],
  templateUrl: './feature-b.component.html',
  styleUrl: './feature-b.component.css',
  standalone: true,
})
export class FeatureBComponent implements OnDestroy, AfterViewInit {
  store: Store<{ featureA: number; featureB: number }> = inject(Store);
  countA$: Observable<number> = this.store.select('featureA');
  countB$: Observable<number> = this.store.select('featureB');

  // serviceB = inject(FeatureBService);
  // serviceA = inject(FeatureAService);
  bookBStore = inject(BookBsStore);

  chatInputControl = new FormControl('');

  constructor() {
    this.chatInputControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        tap((value) => {
          this.socket.emit('sendMessage', {
            sender: 'Phu Tran',
            message: value,
          });
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.socket.connect(() => {
      console.log('Connect successfully');
    });

    this.socket
      .fromEvent('newMessage')
      .pipe(tap((msg) => console.log('incomming msg: ', msg)))
      .subscribe();
  }
  // stateA$ = this.serviceA.state$;
  books = this.bookBStore.books;

  increaseValueAStore() {
    this.bookBStore.updateBook();
    // this.store.dispatch(FeatureAAction.increment());
  }

  increaseValueBStore() {
    this.store.dispatch(FeatureBAction.increment());
  }

  socket: Socket = inject(Socket);

  getMessage() {
    return;
  }

  ngOnDestroy() {
    console.log('ngOnDestroy: COMP B desrtoy...');
    this.socket.disconnect();
  }
}
