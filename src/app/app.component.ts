import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'guiExpenseManager';

  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      keepSignedIn: new FormControl<boolean>(false)
    });
  }



}
