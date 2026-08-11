import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  userName: any;

  constructor(private authSer: AuthService, private messageService: MessageService) { }

  ngOnInit() {
    let userDetails = this.authSer.verifySession();
    if (userDetails) {
      this.userName = userDetails.firstName;
    }
  }

  logOut() {
    this.authSer.logOut('User Logged Out').subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message
        });
      },
    });
  }
}
