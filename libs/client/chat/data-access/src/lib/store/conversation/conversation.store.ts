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
import { tap, timer } from 'rxjs';
import { injectSocket } from '@client/utils/socket';
import { Conversation } from '@shared/models/conversation';
import { Message } from '@shared/models/message';
import { SOCKET_CONVERSATION_PATTERN } from '@shared/socket-pattern';

export const ConversationStore = signalStore(
  { providedIn: 'root' },
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

      setSelectedConversation(selectedConversation: Conversation) {
        patchState(store, { selectedConversation });
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
        socket.joinRoom(conversationId, userId);
      },

      leaveRoom(conversationId: number, userId: number) {
        socket.leaveRoom(conversationId, userId);
      },

      leaveAllRoom() {
        getState(store).conversations.forEach((conv) => {
          socket.leaveRoom(conv.id, appState.user()?.profile?.id as number);
        });
        timer(2000).subscribe(() => {
          socket.disconnect();
        });
        patchState(store, INITIAL_CONVERSATION_STATE);
      },

      registerNewMessageConversation() {
        const roomId =
          SOCKET_CONVERSATION_PATTERN.CONVERSATION_ROOM +
          '__' +
          appState.user().profile?.id;
        console.log('registerNewMessageConversation: ', roomId);
        socket
          .listen(roomId)
          .pipe(
            tap((response: any) => {
              console.log('SOCKET_CHAT_PATTERN.CONVERSATION_ROOM: ', response);
              const conversations = getState(store).conversations;
              conversations.forEach((conv) => {
                if (conv.id === response?.conversationId) {
                  conv.lastMessage = {
                    ...conv.lastMessage,
                    isSender: appState.user()?.profile?.id == response.senderId,
                    content: response.content,
                    timeSend: response.timeSend,
                  };
                  const msg: Message = {
                    content: response?.content,
                    senderId: response?.senderId,
                    receiverId: response?.receiverId,
                    conversationId: response?.conversationId,
                    isSender: false,
                    timeSend: response?.timeSend,
                    isOld: false,
                  };

                  if (!conv.messages?.length) {
                    conv.messages = [msg];
                  } else {
                    conv.messages.push(msg);
                  }
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
    onDestroy(store) {
      store.reset();
      store.leaveAllRoom();
      console.log('onDestroy....');
    },
  })
);
