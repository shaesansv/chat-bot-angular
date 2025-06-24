import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet  // Only RouterOutlet is needed in the template
  ],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class App {
  title = 'angular-chatbot';
}