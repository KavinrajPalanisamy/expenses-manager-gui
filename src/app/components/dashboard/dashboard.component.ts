import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  userName: any;

  constructor(private authSer: AuthService) { }

  ngOnInit() {
    let userDetails = this.authSer.verifySession();
    if (userDetails) {
      this.userName = userDetails.firstName;
    }
  }

  logOut() {
    this.authSer.logOut('User Logged Out').subscribe();
  }
}
