import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import {map} from 'rxjs/operators';

//Models
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: string;

  constructor(private http: HttpClient) {
    this.loadToken();
    this.checkIfTokenExpired();
  }

  registerUser(user: User): any {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/api/users/register', user, {headers: headers})
      .pipe(map(res => {return res}));
  }

  authenticateUser(user: User): any {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/api/users/authenticate', user, {headers: headers})
      .pipe(map(res => {return res}));
  }

  storeUserData(token: string, user: User): void {
    localStorage.clear();
    localStorage.setItem('id_token', token);
    localStorage.setItem('username', user.username);
  }

  loadToken(): void {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  checkIfTokenExpired(): void {
    if(!this.loggedIn()){
      this.logout();
    }
  }

  loggedIn(): boolean {
    return tokenNotExpired('id_token');
  }

  logout(): void {
    this.authToken = null;
    localStorage.clear();
  }
}