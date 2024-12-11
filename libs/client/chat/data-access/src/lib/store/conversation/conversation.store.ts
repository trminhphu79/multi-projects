import {
  withHooks,
  withMethods,
  signalStore,
  withState,
  patchState,
  getState,
} from '@ngrx/signals';
import { INITIAL_CONVERSATION_STATE } from './conversation.state';
import { inject } from '@angular/core';
import { ConversationApi } from '../../service';
import { AppStore } from '@client/store/store';
import { tap } from 'rxjs';
import { injectSocket } from '@client/utils/socket';
import { Conversation } from '@shared/models/conversation';
import { Message } from '@shared/models/message';
import { SOCKET_CHAT_PATTERN } from '@shared/socket-pattern';

export const ConversationStore = signalStore(
  withState(INITIAL_CONVERSATION_STATE),
  withMethods(
    (
      store,
      conversationApi = inject(ConversationApi),
      appState = inject(AppStore),
      socket = injectSocket()
    ) => ({
      resotreMessageToConversation(
        converSationId: number,
        messages: Message[]
      ) {
        const conversations = getState(store).conversations;
        const newMessages = messages.filter((msg) => !msg.isOld);
        if (conversations.length == 0) {
          conversations.push({
            id: converSationId,
            messages,
          } as Conversation);
        } else {
          conversations.forEach((c) => {
            if (c.id === converSationId) {
              newMessages.forEach((msg) => (msg.isOld = true));
              if (c.messages) {
                c.messages = [...c.messages, ...newMessages];
              } else {
                c.messages = [];
              }
            }
          });
        }
        patchState(store, {
          conversations,
        });
      },
      getConversationMessages(conversationId: number) {
        return getState(store).conversations.find(
          (conv) => conv.id == conversationId
        )?.messages as Message[];
      },

      reset() {
        patchState(store, INITIAL_CONVERSATION_STATE);
      },

      getConversations() {
        conversationApi
          .getConversations({
            profileId: appState.user()?.profile?.id as number,
            limit: 10,
          })
          .pipe(
            tap((response: { data: Conversation[] }) => {
              console.log('conversations: ', response.data);
              patchState(store, {
                conversations: response.data?.filter?.(
                  (conv) => conv.lastMessage.id !== appState.user()?.profile?.id
                ),
              });
            })
          )
          .subscribe();
      },

      joinRoom(conversationId: number, userId: number) {
        console.log('joinRoom: ', conversationId, userId);
        socket.joinRoom(conversationId, userId);
      },

      leaveRoom(conversationId: number, userId: number) {
        console.log('leaveRoom: ', conversationId, userId);
        socket.leaveRoom(conversationId, userId);
      },

      registerNewMessageConversation() {
        socket
          .listen(SOCKET_CHAT_PATTERN.NEW_LAST_MESSAGE)
          .pipe(
            tap((response: any) => {
              const conversations = getState(store).conversations;
              conversations.forEach((conv) => {
                if (conv.id === response?.conversationId) {
                  conv.lastMessage = {
                    ...conv.lastMessage,
                    isSender: appState.user()?.profile?.id == response.senderId,
                    content: response.content,
                    timeSend: response.timeSend,
                  };
                }
              });
              conversations.sort(
                (a, b) =>
                  new Date(a?.lastMessage?.timeSend).getTime() -
                  new Date(b?.lastMessage?.timeSend).getTime()
              );
              patchState(store, {
                conversations: conversations,
              });

              console.log('NEW_LAST_MESSAGE: ', response);
              console.log('new conversations: ', conversations);
            })
          )
          .subscribe();
      },
    })
  ),
  withHooks({
    onInit(store) {
      store.getConversations();
      store.registerNewMessageConversation();
    },
    onDestroy(store) {
      store.reset();
    },
  })
);
