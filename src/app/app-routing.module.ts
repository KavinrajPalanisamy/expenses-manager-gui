import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from "./core/guards/auth.guard";

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SignupComponent } from './components/signup/signup.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ManageComponent } from './components/manage/manage.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  {
    path: 'user', component: UserLayoutComponent, canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      {
        path: 'transactions',
        data: { title: 'Transactions' },
        children: [
          { path: 'all-transactions', component: TransactionsComponent, data: { type: 'TRANSACTION_ONLY' } },
          { path: 'transfers', component: TransactionsComponent, data: { type: 'TRANSFERS' } }
        ]
      },
      {
        path: 'accounts',
        data: { title: 'Accounts' },
        children: [
          { path: 'all-accounts', component: AccountsComponent, data: { type: 'ALL_ACCOUNTS' } },
          { path: 'bank-accounts', component: AccountsComponent, data: { type: 'BANK_ACCOUNTS' } },
          { path: 'debt-accounts', component: AccountsComponent, data: { type: 'DEBT_ACCOUNTS' } }
        ]
      },
      {
        path: 'budgets',
        data: { title: 'Budgets' },
        children: [
          { path: 'budget-planner', component: BudgetsComponent, data: { type: 'BUDGET_PLANNER' } },
          { path: 'budget-history', component: BudgetsComponent, data: { type: 'BUDGET_HISTORY' } }
        ]
      },
      {
        path: 'reports',
        data: { title: 'Reports' },
        children: [
          { path: 'spending', component: ReportsComponent, data: { type: 'SPENDING' } },
          { path: 'income-vs-expense', component: ReportsComponent, data: { type: 'INCOME_VS_EXPENSE' } },
          { path: 'net-worth', component: ReportsComponent, data: { type: 'NET_WORTH' } },
          { path: 'custom-report', component: ReportsComponent, data: { type: 'CUSTOM_REPORT' } }
        ]
      },
      {
        path: 'manage',
        data: { title: 'Manage' },
        children: [
          { path: 'categories', component: ManageComponent, data: { type: 'CATEGORIES' } },
          { path: 'account-types', component: ManageComponent, data: { type: 'ACCOUNT_TYPES' } },
          { path: 'providers', component: ManageComponent, data: { type: 'PROVIDERS' } },
        ]
      },
      {
        path: 'settings',
        // component: SettingsComponent,
        data: { title: 'Settings' },
        children: [
          { path: 'edit-profile', component: SettingsComponent, data: { type: 'EDIT_PROFILE' } },
          { path: 'edit-preferences', component: SettingsComponent, data: { type: 'EDIT_PREFERENCES' } },
          { path: 'help', component: SettingsComponent, data: { type: 'HELP' } },
        ]
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
