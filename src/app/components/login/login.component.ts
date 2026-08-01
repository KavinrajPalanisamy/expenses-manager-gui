import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import validator from "validator";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  private terminateApiCalls$ = new Subject<void>();
  isLoggingIn: boolean = false;
  showPassword: boolean = false;

  constructor(private authSer: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      keepSignedIn: new FormControl<boolean>(false)
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoggingIn = true;
    let formData = { ...this.loginForm.value };
    if (!validator.isEmail(formData.email)) {
      formData.userName = formData.email;
      delete formData.email;
    }
    this.authSer.login(formData).pipe(
      takeUntil(this.terminateApiCalls$),
      finalize(()=> this.isLoggingIn = false)
    ).subscribe();
}

  ngOnDestroy() {
    this.terminateApiCalls$.next();
    this.terminateApiCalls$.complete();
  }
}
