import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getProdId(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(`${this.baseUrl}/products/${id}`, { headers });
  }

  getUserId(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(`${this.baseUrl}/users/${id}`, { headers });
  }

  create(qtdPaid: number, deliveryData: string, userId: number, productId: number): Observable<any> {

    const data = { qtdPaid, deliveryData, userId, productId };

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(`${this.baseUrl}/transactions/create`, data, { headers });
  }

  getTransactions(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(`${this.baseUrl}/transactions`, { headers });
  }


}
