import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { PrimeNgModule } from './shared/primeng.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  providers: [providePrimeNG({
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.app-dark'
      }
    }
  })],
  bootstrap: [AppComponent]
})
export class AppModule { }
