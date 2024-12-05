import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

type BooksBState = {
  books: { author: string }[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BooksBState = {
  books: [{ author: 'Phu Tran' }],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const BookBsStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    booksCount: computed(() => store.books().length),
  })),
  withMethods((store) => ({
    updateBook: () => {
      patchState(store, { books: [{ author: 'HEHEHE' }] });
    },
  })),
  withHooks({
    onDestroy(store) {
      console.log('destroy...');
    },
  })
);
