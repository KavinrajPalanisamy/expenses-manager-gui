import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor } from "./interceptors/auth.interceptor";
import { deviceInfoInterceptor } from './interceptors/device-info.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageService } from 'primeng/api';

import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

import { PrimeNgModule } from './shared/primeng.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TransactionsComponent } from './components/transactions/transactions.component';


const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{neutral.50}', 100: '{neutral.100}', 200: '{neutral.200}', 300: '{neutral.300}',
      400: '{neutral.400}', 500: '{neutral.500}', 600: '{neutral.600}', 700: '{neutral.700}',
      800: '{neutral.800}', 900: '{neutral.900}', 950: '{neutral.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff', 50: '{neutral.50}', 100: '{neutral.100}', 200: '{neutral.200}', 300: '{neutral.300}',
          400: '{neutral.400}', 500: '{neutral.500}', 600: '{neutral.600}', 700: '{neutral.700}',
          800: '{neutral.800}', 900: '{neutral.900}', 950: '{neutral.950}',
        },
        content: {
          background: '{neutral.50}',
          hoverBackground: '{neutral.100}',
          borderColor: '{neutral.200}',
        }
      },
      dark: {
        surface: {
          0: '#ffffff', 50: '{neutral.50}', 100: '{neutral.100}', 200: '{neutral.200}', 300: '{neutral.300}',
          400: '{neutral.400}', 500: '{neutral.500}', 600: '{neutral.600}', 700: '{neutral.700}',
          800: '{neutral.800}', 900: '{neutral.900}', 950: '{neutral.950}',
        },
        content: {
          background: '{neutral.950}',
          hoverBackground: '{neutral.900}',
          borderColor: '{neutral.800}',
        }
      }
    }
  }
});

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    SidebarComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    providePrimeNG({
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: '.app-dark'
        }
      }
    }),
    provideHttpClient(
      withInterceptors([authInterceptor, deviceInfoInterceptor])
    ),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
