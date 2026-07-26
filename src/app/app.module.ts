import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor } from "./interceptors/auth.interceptor";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { PrimeNgModule } from './shared/primeng.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ],
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark'
        }
      }
    }),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
