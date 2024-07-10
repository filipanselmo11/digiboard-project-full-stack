import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  create(email: string, name: string, username: string, password: string): Observable<any>{
    const data = {
      "email": email,
      "name": name,
      "username": username,
      "password": password
    };
    return this.httpClient.post(`${this.baseUrl}/auth/register`, data);
  }
}
