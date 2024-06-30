import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroRequest } from '../types/cadastro';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  create(email: string, name: string, password: string): Observable<CadastroRequest>{
    const data = {
      "email": email,
      "name": name,
      "password": password
    };
    return this.httpClient.post<CadastroRequest>(`${this.baseUrl}/users/create`, data);
  }
}
