import {
  withHooks,
  withMethods,
  signalStore,
  withState,
  patchState,
} from '@ngrx/signals';
import { INITIAL_APP_STATE } from './state';
import { AppState, UserState } from './model';
import { injectAppState } from './token';
import { injectSocket } from '@client/utils/socket';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(() => injectAppState()),
  withMethods((store, socket = injectSocket()) => ({
    setState(newState: AppState) {
      patchState(store, { ...newState });
    },
    setUser(data: Partial<UserState>) {
      patchState(store, {
        user: {
          ...store.user(),
          ...data,
        },
      });
      socket.connect();
      socket.online(data.profile?.id as number);
    },
    resetState() {
      patchState(store, INITIAL_APP_STATE);
    },
    signOut() {
      socket.disconnect();
      patchState(store, {
        user: {
          isAuthenticated: false,
        },
      });
    },
  })),
  withHooks({
    onDestroy(store) {
      store.resetState();
    },
  })
);
