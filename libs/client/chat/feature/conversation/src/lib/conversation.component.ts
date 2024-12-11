import { ConversationStore } from '@client/chat/data-access/conversation';
import { AppStore } from './../../../../../shared/store/src/lib/store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversation, MessageCategory } from '@shared/models/conversation';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { AvatarModule } from 'primeng/avatar';
import { debounceTime, delay, distinctUntilChanged, tap } from 'rxjs';
import { ConversationListComponent } from '@client/chat/ui/conversation-list';
import { ChatStore } from 'libs/client/chat/data-access/src/lib/store/chat';
import { ProfileWithFriends } from '@client/store/model';
import { ConversationHeaderComponent } from '@client/chat/ui/conversation-header';

@Component({
  selector: 'cwm-conversation',
  standalone: true,
  imports: [
    ChipModule,
    CardModule,
    CommonModule,
    AvatarModule,
    InputIconModule,
    IconFieldModule,
    ReactiveFormsModule,
    ConversationListComponent,
    ConversationHeaderComponent,
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss',
})
export class ConversationComponent implements OnInit {
  protected searching = signal(false);
  protected searchControl = new FormControl<string>('');

  protected selectedConversation = signal<{
    value: Conversation | null;
    index: number;
  } | null>({ value: null, index: -1 });

  protected selectedMessageCategory = signal<{
    value: MessageCategory | null;
    index: number;
  } | null>({ value: null, index: -1 });

  private appState = inject(AppStore);
  private chatStore = inject(ChatStore);
  private conversationStore = inject(ConversationStore);

  protected messages = this.chatStore.messages;
  protected conversations = this.conversationStore.conversations;

  protected conversation = signal<Conversation | null>(null);
  protected messageCategories = signal<MessageCategory[]>([
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

  ngOnInit() {
    this.registerValueChanges();
  }

  private registerValueChanges() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap((keyword: string | null) => {
          this.searching.set(true);
          // this.searchConversationChanges.emit(keyword);
        }),
        delay(2000),
        tap(() => this.searching.set(false))
      )
      .subscribe();
  }

  protected onSelectConversation(input: { item: Conversation; index: number }) {
    const { id } = this.appState.user()?.profile as ProfileWithFriends;
    if (this.chatStore.conversationId()) {
      this.conversationStore.resotreMessageToConversation(
        this.chatStore.conversationId(),
        this.chatStore.messages()
      );
      this.conversationStore.leaveRoom(
        this.chatStore.conversationId(),
        id as number
      );
      this.chatStore.reset();
    }

    this.conversation.set(input.item);
    this.conversationStore.joinRoom(input.item.id, id);
    console.log('item.receiver: ', input.item.receiver);
    this.chatStore.setConversation(
      input.item.id,
      this.conversationStore.getConversationMessages(input.item.id),
      input.item.receiver
    );
  }

  protected onSelectMessageCategory(input: {
    item: MessageCategory;
    index: number;
  }) {
    console.log('onSelectMessageCategory: ', input);
  }
}
