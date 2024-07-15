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
    const data = { username, password };
    // const data = {
    //   "username": username,
    //   "password": password,
    // };
    return this.httpClient.post(
      `${this.baseUrl}/auth/login`,
      data,
    ).pipe(
        tap((response: any) => {
          console.log('Login Response ', response.token);
          localStorage.setItem('token', response.token);
        })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    console.log('TOKEN REMOVIDO ', this.getToken());
  }
}
