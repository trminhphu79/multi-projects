import { withHooks, withMethods, signalStore, withState } from '@ngrx/signals';
import { INITIAL_CONVERSATION_STATE } from './conversation.state';

export const ConversationStore = signalStore(
  withState(INITIAL_CONVERSATION_STATE),
  withMethods((store) => ({
    
  })),
  withHooks({})
);
