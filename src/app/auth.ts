// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {}

  // Login with email/password
  login(email: string, password: string): Observable<boolean> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map(userCredential => {
        return !!userCredential.user;
      })
    );
  }

  // Register new user
  register(email: string, password: string): Observable<boolean> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map(userCredential => {
        return !!userCredential.user;
      })
    );
  }

  // Logout
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}