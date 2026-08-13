import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { environment } from "../environments/environment";

interface ResInterface {
  success: boolean;
  message: string;
  data: any[];
}

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private http: HttpClient) { }

  getMenuItems(): Observable<ResInterface> {
    return this.http.get<ResInterface>(`${environment.apiUrl}/menu/get-menu-items`, { withCredentials: true })
  }


}
