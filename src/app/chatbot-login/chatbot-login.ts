// chatbot-login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth';
import users from '../../assets/users.json';

type User = {
  username: string;
  password: string;
};

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
  
  // Users data from Json file
  private readonly users: User[] = users;

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
      
      // Verify against users.json credentials
      const foundUser = this.users.find(user =>
        user.username === username && user.password === password
      );

      if (foundUser) {
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