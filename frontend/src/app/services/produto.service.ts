import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoRequest } from '../types/produto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  create(code: string, description: string, enterDate: string, validateDate: string): Observable<ProdutoRequest> {
    // const data = {
    //   "code": code,
    //   "description": description,
    //   "enterDate": enterDate,
    //   "validateDate": validateDate
    // };

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const data = { code, description, enterDate, validateDate };

    return this.httpClient.post<ProdutoRequest>(`${this.baseUrl}/products/create`, data, { headers });
  }

  getProducts(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(`${this.baseUrl}/products`, { headers });
  }
}
