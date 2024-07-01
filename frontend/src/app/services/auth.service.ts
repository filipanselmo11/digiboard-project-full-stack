import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient:HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.httpClient.post(
      `${this.baseUrl}/auth/login`,
      data,
      this.httpOptions
    );
  }

  getProfile(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseUrl}/auth/profile`,
      this.httpOptions
    );
  }

  // logout(): Observable<any> {
  //   return this.httpClient.post()
  // }
}
