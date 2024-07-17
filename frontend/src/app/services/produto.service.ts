import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProdutoRequest } from '../types/produto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private prodSubject = new BehaviorSubject<any[]>([]);
  prods$ = this.prodSubject.asObservable();
  baseUrl = 'http://localhost:3000';


  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.getProducts();
  }

  getProducts() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any[]>(`${this.baseUrl}/products`, { headers }).subscribe(products => {
      this.prodSubject.next(products);
    });
  }

  create(code: string, description: string, enterDate: string, validateDate: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const data = { code, description, enterDate, validateDate };

    return this.httpClient.post<ProdutoRequest>(`${this.baseUrl}/products/create`, data, { headers }).pipe(
      tap(newProd => {
        const currentProds = this.prodSubject.value;
        this.prodSubject.next([...currentProds, newProd]);
      })
    );
  }

}
