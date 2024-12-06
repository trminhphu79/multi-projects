import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-chat-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-module.component.html',
  styleUrl: './chat-module.component.css',
})
export class ChatModuleComponent {}
