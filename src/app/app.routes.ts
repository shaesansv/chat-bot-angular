// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ChatbotLogin } from './chatbot-login/chatbot-login';
import { Chatbot } from './chatbot/chatbot';
import { AuthGuard } from './auth-guard';
import { RegisterComponent } from './register/register';

export const routes: Routes = [
  { path: 'login', component: ChatbotLogin },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: Chatbot,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];
