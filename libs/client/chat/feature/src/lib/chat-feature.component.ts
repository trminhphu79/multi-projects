import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { distinctUntilChanged, debounceTime, tap, filter } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-chat-feature',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './chat-feature.component.html',
  styleUrl: './chat-feature.component.css',
})
export class ChatFeatureComponent {
  title = 'talk-with-me';
  chatInputControl = new FormControl('');
  userControl = new FormControl(null);
  socket = inject(Socket);

  messages: WritableSignal<Array<any>> = signal([]);
  senderAvatar = signal(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTynVaVrlGzFHaL33Qx5QVLGdNiT1bB2IgS-g&s'
  );
  recieverAvatar = signal(
    'https://t3.ftcdn.net/jpg/05/76/94/70/360_F_576947051_DFT5rJEsF8yturr1DOlB3rxhtxswGSmP.jpg'
  );

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  constructor() {
    this.chatInputControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(50),
        filter(() => !!this.userControl.value),
        tap((value) => {
          if (!value) {
            return;
          }

          this.socket.emit('sendMessage', {
            sender: this.userControl.value,
            message: value,
            timestamp: new Date(),
          });
        })
      )
      .subscribe();
  }

  onSend($event: any) {
    this.chatInputControl.setValue($event?.target?.value);
    this.inputRef.nativeElement.value = '';
  }
  onEnterName($event: any) {
    this.userControl.setValue($event?.target?.value);
  }

  ngAfterViewInit() {
    this.socket.connect();
    this.socket
      .fromEvent('newMessage')
      .pipe(
        tap((msg: any) => {
          this.messages.set([...this.messages(), msg]);
        })
      )
      .subscribe();
  }

  getMessage() {
    return;
  }

  ngOnDestroy() {
    console.log('ngOnDestroy: COMP B desrtoy...');
    this.socket.disconnect();
  }
}
