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
import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
import { CommonModule } from '@angular/common';

type Message = { sender: string; message: string; timestamp: Date };
@Component({
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'talk-with-me';
  chatInputControl = new FormControl('');
  userControl = new FormControl(null);
  socket = inject(Socket);
  messages: WritableSignal<Array<Message>> = signal([]);
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  constructor() {
    this.chatInputControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
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
