import { injectSocket } from '@client/utils/socket';
import { AppStore } from '@client/store/store';
import { withHooks, withMethods, signalStore, withState } from '@ngrx/signals';
import { INITIAL_CHAT_STATE } from './chat.state';
import { inject } from '@angular/core';
import { Message } from '../../model';

export const ChatStore = signalStore(
  withState(INITIAL_CHAT_STATE),
  withMethods((store, appState = inject(AppStore)) => ({
    sendMessage: (payload: any) => {
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
  })),
  withHooks({
    onDestroy(store) {
      // store.disconnectSocket();
    },
    onInit(store) {
      console.log("socketService:", )
      // store.registerInCommingMessage();
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
