import { ConversationStore } from '@client/chat/data-access/conversation';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppStore } from '@client/store/store';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ConversationComponent } from '@client/chat/conversation';
import { ChattingComponent } from '@client/chat/chatting';
import { Conversation, MessageCategory } from '@client/chat/model';
import { ChatStore } from 'libs/client/chat/data-access/src/lib/store/chat';
import { ProfileWithFriends } from '@client/store/model';

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
  providers: [ChatStore, ConversationStore],
  templateUrl: './chat-feature.component.html',
  styleUrl: './chat-feature.component.css',
})
export class ChatFeatureComponent {
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

  protected onMessageCategoryChanges(event: MessageCategory) {
    console.log('onMessageCategoryChanges', event);
  }

  protected onConversationChanges(event: Conversation) {
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

    this.conversation.set(event);
    this.conversationStore.joinRoom(event.id, id);
    console.log("event.receiver: ", event.receiver)
    this.chatStore.setConversation(
      event.id,
      this.conversationStore.getConversationMessages(event.id),
      event.receiver
    );
  }

  protected onSendMessage(message: string) {
    this.chatStore.sendMessage(message);
  }
}
