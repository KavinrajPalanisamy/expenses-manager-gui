import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from "./core/guards/auth.guard";

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SignupComponent } from './components/signup/signup.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'user/dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { title: 'Dashboard' }
  },
  { path: 'user/transactions',
    component: TransactionsComponent,
    canActivate: [authGuard],
    data: { title: 'Transactions' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
