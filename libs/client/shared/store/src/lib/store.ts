import {
  withHooks,
  withMethods,
  signalStore,
  withState,
  patchState,
} from '@ngrx/signals';
import { INITIAL_APP_STATE } from './state';
import { AppState, UserState } from './model';
import { inject } from '@angular/core';
import { APP_STATE } from './token';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(APP_STATE)),
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
  })),
  withHooks({
    onDestroy(store) {
      store.resetState();
    },
  })
);
