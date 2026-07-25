import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  private terminateApiCalls$ = new Subject<void>();

  constructor(private authSer: AuthService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      keepSignedIn: new FormControl<boolean>(false)
    });
  }

  verifyLogin() {
    let accessToken = localStorage.getItem('accessToken');
    let userData = localStorage.getItem('userData');
    if (accessToken && userData) {
      
    }
  }


  onSubmit() {
    if (this.formGroup.invalid) return;
    this.authSer.login(this.formGroup.value).pipe(takeUntil(this.terminateApiCalls$)).subscribe();
  }

  ngOnDestroy() {
    this.terminateApiCalls$.next();
    this.terminateApiCalls$.complete();
  }
}
