import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, JsonPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'netflix';

  httpClient = inject(HttpClient);
  response = signal(null);

  constructor() {
    this.httpClient.get('http://localhost:3000/').subscribe((response: any) => {
      this.response.set(response);
    });
  }
}
