import { createReducer, on } from '@ngrx/store';
import { FeatureBAction } from './feature-b.action';

export const initialState = 0;

export const featureBReducer = createReducer(
  initialState,
  on(FeatureBAction.increment, (state) => state + 1),
  on(FeatureBAction.decrement, (state) => state - 1),
  on(FeatureBAction.reset, (state) => 0)
);
