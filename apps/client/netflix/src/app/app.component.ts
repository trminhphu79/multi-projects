import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    AsyncPipe,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'netflix';

  response = signal(null);
  // socket: Socket = inject(Socket);

  // getMessage() {
  //   return this.socket.fromEvent('newMessage').pipe(map((data: any) => data));
  // }
}
