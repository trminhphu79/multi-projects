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

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(() => injectAppState()),
  withMethods((store) => ({
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
    },
    resetState() {
      patchState(store, INITIAL_APP_STATE);
    },
    signOut() {
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
