import { createReducer, on } from '@ngrx/store';
import { FeatureAAction } from './feature-a.action';

export const initialState = 0;

export const featureAReducer = createReducer(
  initialState,
  on(FeatureAAction.increment, (state) => state + 1),
  on(FeatureAAction.decrement, (state) => state - 1),
  on(FeatureAAction.reset, (state) => 0)
);
