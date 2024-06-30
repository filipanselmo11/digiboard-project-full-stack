import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../types/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<LoginRequest> {
    const data = { email, password };
    localStorage.setItem('data-user', JSON.stringify(data));
    return this.httpClient.post<LoginRequest>(`${this.baseUrl}/auth/login`, data);
  }

  // getUser(): Observable<LoginResponse> {
  //   return this.httpClient.get<LoginResponse>(`${this.baseUrl}/auth/profile`)
  // }

  logout(): void {
    // const data = null;
    this.router.navigate(['login']);
  }

  getUser(): Observable<{ email: string, password: string, name: string } | null> {
    const user = JSON.parse(localStorage.getItem('data-user') || 'null');
    return user;
  }

}
