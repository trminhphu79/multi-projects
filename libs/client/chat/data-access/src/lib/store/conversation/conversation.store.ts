import {
  withHooks,
  withMethods,
  signalStore,
  withState,
  patchState,
} from '@ngrx/signals';
import { INITIAL_CONVERSATION_STATE } from './conversation.state';
import { inject } from '@angular/core';
import { ConversationApi } from '../../service';
import { AppStore } from '@client/store/store';
import { tap } from 'rxjs';

export const ConversationStore = signalStore(
  withState(INITIAL_CONVERSATION_STATE),
  withMethods(
    (
      store,
      conversationApi = inject(ConversationApi),
      appState = inject(AppStore)
    ) => ({
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
            tap((response: any) => {
              console.log('response: ', response);
              patchState(store, {
                conversations: response.data?.map((d: any) => ({
                  ...d,
                  lastMessage: {
                    content: 'Nothing...',
                    timeSend: new Date().toISOString(),
                    fullName: d?.fullName,
                    avatarUrl: d?.avatarUrl,
                  },
                })),
              });
            })
          )
          .subscribe();
      },
    })
  ),
  withHooks({
    onInit(store) {
      store.getConversations();
    },
    onDestroy(store) {
      store.reset();
    },
  })
);
