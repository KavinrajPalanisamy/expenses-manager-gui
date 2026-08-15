import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MessageService } from 'primeng/api';
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private authSer: AuthService, private messageService: MessageService) {
    this.isLoggedIn$ = this.authSer.isLoggedIn$;
  }

  email: string = '';
  userName: string = '';
  displayName: string = '';
  enableSidebar: boolean = false;

  dropDownItems: any[] = [];

  ngOnInit() {
    let userDetails = this.authSer.verifySession();
    if (userDetails) {
      this.enableSidebar = true;
      this.userName = userDetails.firstName;
      this.displayName = userDetails.displayName;
      this.email = userDetails.email;

      this.dropDownItems = [
        {
          separator: true
        },
        {
          label: 'Switch Theme',
          icon: 'pi pi-moon'
        },
        {
          separator: true
        },
        {
          label: 'Edit Profile',
          icon: 'pi pi-user-edit'
        },
        {
          label: 'Change Password',
          icon: 'pi pi-key'
        },
        {
          separator: true
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            this.logOut();
          }
        }
      ];
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
