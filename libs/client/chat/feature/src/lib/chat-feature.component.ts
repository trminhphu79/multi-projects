import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { distinctUntilChanged, debounceTime, tap, filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppStore } from '@client/store/store';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ConversationComponent } from '@client/chat/conversation';
import { ChattingComponent } from '@client/chat/chatting';
import { Conversation, MessageCategory } from '@client/chat/model';
import { ChatStore } from '@client/chat/store';

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
  providers: [ChatStore],
  templateUrl: './chat-feature.component.html',
  styleUrl: './chat-feature.component.css',
})
export class ChatFeatureComponent {
  title = 'Chat with me';
  chatInputControl = new FormControl('');
  userControl = new FormControl(null);
  appState = inject(AppStore);
  conversation = signal<Conversation | null>(null);
  chatStore = inject(ChatStore);
  messages = this.chatStore.messages;

  conversations = computed(() => {
    return this.appState.user().profile?.friends?.map((profile: any) => {
      return {
        ...profile,
        sender: profile.fullName as string,
        lastMessage: '...',
        unread: true,
        time: '2 mins ago',
        avatarUrl: profile.avatarUrl,
        profileId: profile.id,
      };
    }) as any[];
  });
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
  // conversations = signal<Conversation[]>([
  //   {
  //     sender: 'Trần Minh Phú',
  //     lassMessage: 'Có đó không?',
  //     unread: false,
  //     time: '2 mins ago',
  //     avatarUrl:
  //       'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
  //   },
  //   {
  //     sender: 'Nguyễn Văn A',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //     avatarUrl:
  //       'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
  //   },
  //   {
  //     sender: 'Nguyễn Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn A',
  //     lassMessage: 'Có đó không?',
  //     unread: false,
  //     time: '2 mins ago',
  //     avatarUrl:
  //       'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
  //   },
  //   {
  //     sender: 'Trần Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Nguyễn Văn B',
  //     lassMessage: 'Có đó không?',
  //     avatarUrl:
  //       'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn A',
  //     lassMessage: 'Có đó không?',
  //     unread: false,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Nguyễn Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn A',
  //     lassMessage: 'Có đó không?',
  //     unread: false,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Nguyễn Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn A',
  //     lassMessage: 'Có đó không?',
  //     unread: false,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Nguyễn Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn A',
  //     lassMessage: 'Có đó không?',
  //     unread: false,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Nguyễn Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn A',
  //     lassMessage: 'Có đó không?',
  //     unread: false,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Nguyễn Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn A',
  //     lassMessage: 'Có đó không?',
  //     unread: false,
  //     time: '2 mins ago',
  //   },
  //   {
  //     sender: 'Trần Văn B',
  //     lassMessage: 'Có đó không?',
  //     unread: true,
  //     time: '2 mins ago',
  //   },
  // ]);

  user = this.appState.user;

  senderAvatar = signal(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTynVaVrlGzFHaL33Qx5QVLGdNiT1bB2IgS-g&s'
  );
  recieverAvatar = signal(
    'https://t3.ftcdn.net/jpg/05/76/94/70/360_F_576947051_DFT5rJEsF8yturr1DOlB3rxhtxswGSmP.jpg'
  );

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

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

  onMessageCategoryChanges(event: MessageCategory) {
    console.log('onMessageCategoryChanges', event);
  }

  onConversationCategoryChanges(event: Conversation) {
    console.log('onConversationCategoryChanges', event);
    this.conversation.set(event);
  }

  onSendMessage(message: string) {
    console.log('onSendMessage: ', message);
    this.chatStore.sendMessage({
      senderId: this.appState.user().profile?.id as number,
      receiverId: this.conversation()?.profileId as number,
      message,
    });
  }
}
