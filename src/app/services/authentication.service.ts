import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Admin } from '../model/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  registerData(credentials: { email: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/register`, credentials);
  }

  loginData(data: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('adminToken');
  }
  logout(): void {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/login']);
  }
}
  //     .pipe(
  //       tap({
  //         next: (response) => {
  //           if (response.token) {
  //             localStorage.setItem('adminToken', response.token);
  //             this.router.navigate(['/dashboard']);
  //           } else {
  //             console.error('No token received:', response);
  //           }
  //         },
  //         error: (error) => {
  //           console.error('Login failed', error);
  //         }
  //       })
  //     );
  // }

  // isAuthenticated(): boolean {
  //   return !!localStorage.getItem('adminToken');
  // }
  // canActivate(): boolean {
  //   if (this.isAuthenticated()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }
  
