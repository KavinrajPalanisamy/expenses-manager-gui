import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from "@angular/router";

import { environment } from "../environments/environment";

interface LoginRes {
  accessToken: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${environment.apiUrl}/auth/verify-user`, data, { withCredentials: true }).pipe(
      tap(res => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('userData', res.data);
        this.router.navigate(['dashboard']);
      })
    );
  }

  logOut(reason: string) {
    let sessionDetails = this.getSessionDetails();
    sessionDetails.revokeReason = reason;
    return this.http.post<LoginRes>(`${environment.apiUrl}/auth/log-out`, sessionDetails, { withCredentials: true }).pipe(
      tap(res => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        this.router.navigate(['']);
      })
    );
  }

  getSessionDetails() {
    let userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
    if (Object.keys(userDetails).length) {
      return userDetails;
    } else {
      return null;
    }
  }

  verifySession() {
    let accessToken = localStorage.getItem('accessToken') || '';
    if (!accessToken) {
      this.router.navigate(['']);
      return null;
    }
    let isTokenValid = !this.isTokenExpired(accessToken)
    if (isTokenValid) {
      return this.getSessionDetails();
    } else {
      this.logOut('Token Expired').subscribe();
    }
  }

  isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.exp) {
        return true;
      }
      const expiryTime = payload.exp * 1000;
      return Date.now() >= expiryTime;

    } catch (error) {
      return true;
    }
  }
}
