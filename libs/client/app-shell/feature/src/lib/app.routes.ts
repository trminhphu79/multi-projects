import { Route } from '@angular/router';
import { LayoutComponent } from '@client/layout';
import { AuthGuard } from '@client/guard/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('@client/chat').then((c) => c.ChatFeatureComponent),
      },
    ],
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@client/user').then((c) => c.UserFeatureComponent),
      },
    ],
  },
  // PageNotFound route as a global fallback
  {
    path: '**',
    loadComponent: () =>
      import('@client/page-not-found').then((c) => c.PageNotFoundComponent),
  },
];
