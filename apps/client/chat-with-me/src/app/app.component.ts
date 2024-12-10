import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { injectAppState } from '@client/store/token';
import { injectAppConfig } from '@client/utils/app-config';
import { injectSocket } from '@client/utils/socket';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  socket = injectSocket();
  appConfig = injectAppConfig();
  appState = injectAppState();

  constructor() {
    console.log('AppComponent...', this);
  }
}
