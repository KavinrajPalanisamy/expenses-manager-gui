import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MessageService } from 'primeng/api';
import { filter, Observable } from "rxjs";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  private readonly THEME_KEY = 'theme';

  constructor(private authSer: AuthService, private messageService: MessageService, private router: Router, private activatedRoute: ActivatedRoute) {
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
  title = 'Dashboard';
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

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        this.title = route.snapshot.data['title'];
      });
  }

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
