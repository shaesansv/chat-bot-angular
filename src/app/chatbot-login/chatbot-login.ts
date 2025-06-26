// src/app/chatbot-login/chatbot-login.component.ts
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-chatbot-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './chatbot-login.html',
  styleUrls: ['./chatbot-login.css'],
})
export class ChatbotLogin {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      // Change username to email and add email validation
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // src/app/chatbot-login/chatbot-login.component.ts
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'Invalid email or password';
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = this.getFirebaseErrorMessage(err);
          this.isLoading = false;
          console.error('Login error:', err);
        },
      });
    }
  }

  private getFirebaseErrorMessage(error: any): string {
    if (!error) return 'An unknown error occurred';

    switch (error.code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-disabled':
        return 'User account is disabled';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later';
      case 'auth/network-request-failed':
        return 'Network error. Check your connection';
      default:
        return 'Login failed. Please try again';
    }
  }
}
