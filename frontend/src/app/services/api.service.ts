import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  user: [boolean, string] = [false, ''];
  login(body: { email: string; password: string }): any {
    let headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.httpClient.post(
      'http://localhost:7000/user/login',
      JSON.stringify(body),
      {
        headers,
      }
    );
  }

  signup(body: { email: string; password: string; name: string }): any {
    let headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.httpClient.post(
      'http://localhost:7000/user/signup',
      JSON.stringify(body),
      {
        headers,
      }
    );
  }

  getProfile(): Observable<any> {
    let token = localStorage.getItem('nf_token');
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(`http://localhost:7000/user/profile`, {
      headers,
    });
  }

  setProfile(): void {
    let token = localStorage.getItem('nf_token');
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    });
    this.httpClient
      .get(`http://localhost:7000/user/profile`, {
        headers,
      })
      .pipe(catchError((err) => of([])))
      .subscribe(
        (value: any) => {
          if (value.status == 'success') {
            this.user[0] = true;
            this.user[1] = value.name;
          } else {
            this.user[0] = false;
            this.user[1] = '';
          }
        },
        (err: any) => {
          this.user[0] = false;
        }
      );
  }

  getNews(source?: string[], search?: string, page?: number): any {
    let token = localStorage.getItem('nf_token');
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    });
    return this.httpClient.get(
      `http://localhost:7000/news?sources=${source}&search=${search}&limit=10&page=${page}`,
      { headers }
    );
  }
}
