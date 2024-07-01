import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getUserId(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/users/${id}`);
  }

  getProductId(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/products/${id}`);
  }

  create(qtdPaid: number, deliveryData: string, userId: number, productId: number): Observable<any> {
    const data = {
      "qtdPaid": qtdPaid,
      "deliveryData": deliveryData,
      "userId": userId,
      "productId": productId
    }
    return this.httpClient.post(`${this.baseUrl}/transactions/create`, data);
  }

  getTransactions(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/transactions`);
  }


}
