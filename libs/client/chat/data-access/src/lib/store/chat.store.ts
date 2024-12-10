import { AppStore } from '@client/store/store';
import {
  withHooks,
  watchState,
  withMethods,
  signalStore,
  withComputed,
  withState,
  patchState,
  getState,
} from '@ngrx/signals';
import { INITIAL_CHAT_STATE } from './chat.state';
import { inject } from '@angular/core';
import { Message } from './chat.model';

export const ChatStore = signalStore(
  withState(INITIAL_CHAT_STATE),
  withMethods(
    (store, appState = inject(AppStore)) => ({
      sendMessage: (payload: Message) => {
        // socket.emit('SEND_MSG', payload);
      },
      disconnectSocket() {
        console.log('disconnectSocket...');
        // socket.disconnect();
      },
      registerInCommingMessage() {
        // socket.connect();
        console.log('registerInCommingMessage... ');
        // socket
        //   .fromEvent('NEW_MSG')
        //   .pipe(
        //     tap((newMessage: any) => {
        //       patchState(store, {
        //         messages: [
        //           ...getState(store).messages,
        //           mapingMessage(
        //             newMessage,
        //             appState.user().profile?.id as number
        //           ),
        //         ],
        //       });
        //       console.log('newMessage', newMessage);
        //     })
        //   )
        //   .subscribe();
      },
    })
  ),
  withHooks({
    onDestroy(store) {
      store.disconnectSocket();
    },
    onInit(store) {
      store.registerInCommingMessage();
    },
  })
);

function mapingMessage(newMessage: any, currentId: number): Partial<Message> {
  return {
    ...newMessage,
    isSender: newMessage.senderId == currentId,
    isReceiver: newMessage.senderId == currentId,
    content: newMessage.content,
  };
}
