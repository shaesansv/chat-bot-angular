// app.routes.ts
import { Routes } from '@angular/router';
import { ChatbotLogin } from './chatbot-login/chatbot-login';
import { Chatbot } from './chatbot/chatbot';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
  { path: 'login', component: ChatbotLogin },
  { 
    path: '', 
    component: Chatbot,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];