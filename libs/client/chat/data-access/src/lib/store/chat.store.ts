import {
  withHooks,
  watchState,
  withMethods,
  signalStore,
  withComputed,
  withState,
} from '@ngrx/signals';
import { INITIAL_CHAT_STATE } from './chat.state';

export const ChatStore = signalStore(
  withState(INITIAL_CHAT_STATE),
  withHooks({
    onDestroy(store) {
      console.log('onDestroy store..');
    },
    onInit(store) {
      console.log('onInit store..');
    },
  })
);
