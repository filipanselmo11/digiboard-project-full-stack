import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  private transactionSubject = new BehaviorSubject<any[]>([]);
  transactions$ = this.transactionSubject.asObservable();

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.getTransactions();
  }

  getTransactions() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any[]>(`${this.baseUrl}/transactions`, { headers })
      .subscribe(transactions => {
        this.transactionSubject.next(transactions);
      });
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

    return this.httpClient.post<any>(`${this.baseUrl}/transactions/create`, data, { headers }).pipe(
      tap(newTransaction => {
        const currentTransactions = this.transactionSubject.value;
        this.transactionSubject.next([...currentTransactions, newTransaction]);
      })
    );
  }


}
