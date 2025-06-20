import { Component } from '@angular/core';
import { Chatbot } from './chatbot/chatbot';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Chatbot],
  template: `
    <main>
      <app-chatbot></app-chatbot>
    </main>
  `,
  styles: []
})
export class App {
  title = 'angular-chatbot';
}