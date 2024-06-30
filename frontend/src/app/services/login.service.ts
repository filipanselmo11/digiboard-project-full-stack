import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<{ name: string } | null>;
  public user$: Observable<{ name: string } | null>;

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private router: Router) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    this.userSubject = new BehaviorSubject<{ name: string } | null>(user);
    this.user$ = this.userSubject.asObservable();

  }

  login(email: string, password: string): Observable<void> {
    const data = { email, password };
    return this.httpClient.post<{ token: string }>(`${this.baseUrl}/auth/login`, data)
      .pipe(map(response => {
        localStorage.setItem('token', response.token);
        this.fetchUserDetails().subscribe();
      }));
  }

  // getUser(): Observable<LoginResponse> {
  //   return this.httpClient.get<LoginResponse>(`${this.baseUrl}/auth/profile`)
  // }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['login']);
  }

  fetchUserDetails(): Observable<{ name: string | null}> {
    return this.httpClient.get<{ name: string }>(`${this.baseUrl}/auth/profile`).pipe(
      map(user => {
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      })
    )
  }

  getUser(): Observable<{ name: string } | null> {
    return this.user$;
  }

  isLogged(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

}
