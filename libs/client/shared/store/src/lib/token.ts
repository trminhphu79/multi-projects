import { InjectionToken } from '@angular/core';
import { INITIAL_APP_STATE } from './state';
import { AppState } from './model';

export const APP_STATE = new InjectionToken<AppState>('AppState', {
  factory: () => INITIAL_APP_STATE,
  providedIn: 'root',
});
