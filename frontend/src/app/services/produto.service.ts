import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoRequest } from '../types/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  create(code: string, description: string, enterDate: string, validateDate: string): Observable<ProdutoRequest> {
    const data = {
      "code": code,
      "description": description,
      "enterDate": enterDate,
      "validateDate": validateDate
    };

    return this.httpClient.post<ProdutoRequest>(`${this.baseUrl}/products/create`, data);
  }

  getProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/products`);
  }
}
