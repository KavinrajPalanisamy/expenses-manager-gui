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

  private readonly THEME_KEY = 'theme';

  constructor(private authSer: AuthService, private messageService: MessageService) {
    this.isLoggedIn$ = this.authSer.isLoggedIn$;
    this.applyStoredTheme();
    this.isLoggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.loadUserDetails();
      } else {
        this.userName = '';
        this.displayName = '';
        this.email = '';
      }
    });
  }

  isLoading: boolean = false;
  email: string = '';
  userName: string = '';
  displayName: string = '';

  dropDownItems: any[] = [
    {
      separator: true
    },
    {
      label: 'Switch Theme',
      icon: 'pi pi-moon',
      command: () => {
        this.switchTheme();
      }
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

  ngOnInit() { }

  private loadUserDetails() {
    this.isLoading = true;
    let userDetails = this.authSer.verifySession();
    if (userDetails) {
      this.userName = userDetails.firstName;
      this.displayName = userDetails.displayName;
      this.email = userDetails.email;
    }
    this.isLoading = false;
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

  getCurrentTheme() {
    const currentTheme = document.documentElement.classList.contains('app-dark');
    return currentTheme ? 'Light' : 'Dark';
  }
  switchTheme() {
    const isDark = document.documentElement.classList.contains('app-dark');
    this.setTheme(isDark ? 'light' : 'dark');
  }

  private applyStoredTheme() {
    const savedTheme = (localStorage.getItem(this.THEME_KEY) as 'dark' | 'light') || 'dark';
    this.setTheme(savedTheme);
  }

  private setTheme(theme: 'dark' | 'light') {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('app-dark', 'dark');
    } else {
      root.classList.remove('app-dark', 'dark');
    }
    localStorage.setItem(this.THEME_KEY, theme);
  }
}
