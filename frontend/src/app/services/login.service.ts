import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../types/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<LoginRequest> {
    const data = {
      "email": email,
      "password": password
    };
    return this.httpClient.post<LoginRequest>(`${this.baseUrl}/auth/login`, data);
  }
}
