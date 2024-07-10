import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient:HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const data = {
      "username": username,
      "password": password,
    };
    return this.httpClient.post<any>(
      `${this.baseUrl}/auth/login`,
      data,
    ).pipe(
      tap(response => localStorage.setItem('token', response.token))
    );
  }

  getMe(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/users/me`);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
