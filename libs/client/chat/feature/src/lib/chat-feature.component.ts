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
import { AppStore } from '@client/store/store';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ConversationComponent } from '@client/chat/conversation';
import { ChattingComponent } from '@client/chat/chatting';
import { Conversation, MessageCategory } from '@client/chat/model';

@Component({
  selector: 'lib-chat-feature',
  standalone: true,
  imports: [
    ChipModule,
    CardModule,
    CommonModule,
    RouterModule,
    AvatarModule,
    ChattingComponent,
    ReactiveFormsModule,
    ConversationComponent,
  ],
  templateUrl: './chat-feature.component.html',
  styleUrl: './chat-feature.component.css',
})
export class ChatFeatureComponent {
  title = 'Chat with me';
  chatInputControl = new FormControl('');
  userControl = new FormControl(null);
  socket = inject(Socket);
  appState = inject(AppStore);
  conversation = signal<Conversation | null>(null);

  messageCategories = signal<MessageCategory[]>([
    {
      label: 'All',
      selected: true,
    },
    {
      label: 'Unread',
      selected: false,
    },
    {
      label: 'Groups',
      selected: false,
    },
  ]);

  conversations = signal<Conversation[]>([
    {
      sender: 'Trần Minh Phú',
      lassMessage: 'Có đó không?',
      unread: false,
      time: '2 mins ago',
      avatarUrl:
        'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
    },
    {
      sender: 'Nguyễn Văn A',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
      avatarUrl:
        'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
    },
    {
      sender: 'Nguyễn Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn A',
      lassMessage: 'Có đó không?',
      unread: false,
      time: '2 mins ago',
      avatarUrl:
        'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
    },
    {
      sender: 'Trần Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Nguyễn Văn B',
      lassMessage: 'Có đó không?',
      avatarUrl:
        'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn A',
      lassMessage: 'Có đó không?',
      unread: false,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Nguyễn Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn A',
      lassMessage: 'Có đó không?',
      unread: false,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Nguyễn Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn A',
      lassMessage: 'Có đó không?',
      unread: false,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Nguyễn Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn A',
      lassMessage: 'Có đó không?',
      unread: false,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Nguyễn Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn A',
      lassMessage: 'Có đó không?',
      unread: false,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Nguyễn Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn A',
      lassMessage: 'Có đó không?',
      unread: false,
      time: '2 mins ago',
    },
    {
      sender: 'Trần Văn B',
      lassMessage: 'Có đó không?',
      unread: true,
      time: '2 mins ago',
    },
  ]);

  user = this.appState.user;

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
        filter(() => !!this.user().email),
        tap((value) => {
          if (!value) {
            return;
          }

          this.socket.emit('sendMessage', {
            sender: this.user().email,
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

  calcHeight(titleHeight: number, categoryHeight: number): string {
    return `calc(100% - (${titleHeight - categoryHeight}px))`;
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

  onMessageCategoryChanges(event: MessageCategory) {
    console.log('onMessageCategoryChanges', event);
  }

  onConversationCategoryChanges(event: Conversation) {
    console.log('onConversationCategoryChanges', event);
    this.conversation.set(event);
  }
}
