import { Route } from '@angular/router';
import { MainFeatureComponent } from './main-feature/main-feature.component';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { featureAReducer } from './feature-a/store/feature-a.reducer';
import { featureBReducer } from './feature-b/store/feature-b.reducer';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const socketConfig: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    autoConnect: false,
    reconnectionDelay: 5000
  },
};

export const childrentRote: Route[] = [
  {
    path: 'comp-a',
    loadComponent: () =>
      import('./feature-a/feature-a.component').then(
        (c) => c.FeatureAComponent
      ),
    providers: [
      importProvidersFrom(StoreModule.forFeature('featureA', featureAReducer)),
      importProvidersFrom(StoreModule.forFeature('featureB', featureBReducer)),
    ],
  },
  {
    path: 'comp-b',
    loadComponent: () =>
      import('./feature-b/feature-b.component').then(
        (c) => c.FeatureBComponent
      ),
    providers: [
      importProvidersFrom(SocketIoModule.forRoot(socketConfig)),
      //   importProvidersFrom(StoreModule.forFeature('featureA', featureAReducer)),
      //   importProvidersFrom(StoreModule.forFeature('featureB', featureBReducer)),
    ],
  },
];

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./main-feature/main-feature.component').then(
        (c) => c.MainFeatureComponent
      ),
    loadChildren: () => Promise.resolve(childrentRote),
  },
];
