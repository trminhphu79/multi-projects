import { createAction } from '@ngrx/store';

export const FeatureBAction = {
  increment: createAction('[Counter B Component] Increment'),
  decrement: createAction('[Counter B Component] Decrement'),
  reset: createAction('[Counter B Component] Reset'),
};
