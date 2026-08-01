import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Router } from "@angular/router";
import { UAParser } from "ua-parser-js";

import { environment } from "../environments/environment";

interface SignupRes {
  accessToken: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  parser = new UAParser();
  result = this.parser.getResult();
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Browser': this.result.browser.name ?? '',
    'X-Browser-Version': this.result.browser.version ?? '',
    'X-OS': this.result.os.name ?? '',
    'X-OS-Version': this.result.os.version ?? '',
    'X-Device-Type': this.result.device.type ?? 'desktop',
    'X-Device-Vendor': this.result.device.vendor ?? '',
    'X-Device-Model': this.result.device.model ?? '',
    'X-Language': navigator.language,
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    'X-Platform': navigator.platform
  });

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(data: any): Observable<SignupRes> {
    return this.http.post<SignupRes>(`${environment.apiUrl}/users/register-user`, data, { headers: this.headers, withCredentials: true }).pipe(
      tap(res => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('userData', res.data);
        this.router.navigate(['dashboard']);
      })
    );
  }

  checkUserExists(data: string): Observable<boolean> {
    return this.http.get<{ isUserExits: boolean, message: string }>(`${environment.apiUrl}/users/check-user-exists?${data}`).pipe(map(res => res.isUserExits));
  }

}
