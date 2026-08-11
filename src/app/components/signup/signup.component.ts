import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, finalize } from 'rxjs';
import { MessageService } from 'primeng/api';

import { UserService } from "../../services/user.service";

import { usernameExistsValidator } from "../../shared/validators/username-exists.service";

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm!: FormGroup;
  defaultDate: Date = new Date(new Date().getFullYear() - 20, new Date().getMonth(), new Date().getDate());
  maxDate: Date = new Date(new Date().getFullYear() - 10, 12, 31);
  minDate: Date = new Date(1930, 1, 1);
  private terminateApiCalls$ = new Subject<void>();
  isRegistering: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private userSer: UserService, private messageService: MessageService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl(''),
      userName: new FormControl('', [Validators.required, Validators.minLength(4)], [usernameExistsValidator(this.userSer, 'userName')]),
      displayName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      dateOfBirth: new FormControl<Date | null>(null),
      email: new FormControl('', [Validators.required, Validators.email], [usernameExistsValidator(this.userSer, 'email')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
      acceptTermsAndConditions: new FormControl<boolean>(false)
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    this.isRegistering = true;
    this.userSer.registerUser(this.signUpForm.value).pipe(
      takeUntil(this.terminateApiCalls$),
      finalize(()=> this.isRegistering = false)
    ).subscribe({
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

  ngOnDestroy() {
    this.terminateApiCalls$.next();
    this.terminateApiCalls$.complete();
  }
}
