// chatbot-login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-chatbot-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule
  ],
  templateUrl: './chatbot-login.html',
  styleUrls: ['./chatbot-login.css']
})
export class ChatbotLogin {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  
  // Default credentials
  private readonly DEFAULT_USERNAME = 'admin';
  private readonly DEFAULT_PASSWORD = 'admin123';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const { username, password } = this.loginForm.value;
      
      // Verify against default credentials
      if (username === this.DEFAULT_USERNAME && password === this.DEFAULT_PASSWORD) {
        this.authService.login(username, password).subscribe({
          next: (success) => {
            if (success) {
              this.router.navigate(['/'])
                .then(() => console.log('Navigation successful'))
                .catch(err => console.error('Navigation error:', err));
            } else {
              this.errorMessage = 'Authentication failed';
            }
            this.isLoading = false;
          },
          error: (err) => {
            this.errorMessage = 'An error occurred during login';
            this.isLoading = false;
            console.error('Login error:', err);
          }
        });
      } else {
        this.errorMessage = 'Invalid username or password';
        this.isLoading = false;
      }
    }
  }
}