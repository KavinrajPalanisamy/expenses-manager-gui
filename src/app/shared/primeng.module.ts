import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToggleSwitch } from 'primeng/toggleswitch';

const PRIMENG_MODULES = [
  ButtonModule,
  InputTextModule,
  PasswordModule,
  TableModule,
  CardModule,
  DialogModule,
  DropdownModule,
  CalendarModule,
  CheckboxModule,
  RadioButtonModule,
  InputNumberModule,
  ToastModule,
  ConfirmDialogModule,
  MenubarModule,
  ToolbarModule,
  TagModule,
  BadgeModule,
  DividerModule,
  PanelModule,
  ProgressSpinnerModule,
  ToggleSwitch
];

@NgModule({
  imports: [...PRIMENG_MODULES],
  exports: [...PRIMENG_MODULES]
})
export class PrimeNgModule {}