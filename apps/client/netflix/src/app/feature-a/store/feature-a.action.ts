import { createAction } from '@ngrx/store';

export const FeatureAAction = {
  increment: createAction('[Counter A Component] Increment'),
  decrement: createAction('[Counter A Component] Decrement'),
  reset: createAction('[Counter A Component] Reset'),
};
