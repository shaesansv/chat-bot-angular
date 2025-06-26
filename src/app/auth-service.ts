import { Injectable, NgZone } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: Auth,
    private ngZone: NgZone,
    private http: HttpClient
  ) {}

  // Properly wrapped Firebase operations with zone handling
  register(email: string, password: string): Observable<boolean> {
    return this.ngZone.runOutsideAngular(() => {
      return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
        map(userCredential => {
          return this.ngZone.run(() => {
            return !!userCredential.user;
          });
        }),
        catchError(error => {
          return this.ngZone.run(() => {
            console.error('Registration error:', error);
            return of(false);
          });
        })
      );
    });
  }

  // Similarly for login method
  login(email: string, password: string): Observable<boolean> {
    return this.ngZone.runOutsideAngular(() => {
      return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
        map(userCredential => {
          return this.ngZone.run(() => {
            return !!userCredential.user;
          });
        }),
        catchError(error => {
          return this.ngZone.run(() => {
            console.error('Login error:', error);
            return of(false);
          });
        })
      );
    });
  }
}