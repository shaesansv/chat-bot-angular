// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './app/auth-guard';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Use the new provideHttpClient() function
    AuthGuard
  ]
}).catch(err => console.error(err));