import { AppStore } from '@client/store/store';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SignInComponent } from '@client/user/sign-in';
import { RegisterComponent } from '@client/user/register';
import { ToastModule } from 'primeng/toast';
import { UserService } from '@client/user/data-access/service';
import { catchError, delay, EMPTY, tap } from 'rxjs';
import {
  UserSignInPayload,
  UserSignUpPayload,
} from '@client/user/data-access/model';
import { ToastService } from '@client/util/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'lib-user-feature',
  standalone: true,
  imports: [
    ToastModule,
    CommonModule,
    ButtonModule,
    PasswordModule,
    SignInComponent,
    RegisterComponent,
    ReactiveFormsModule,
  ],
  providers: [UserService, ToastService, MessageService],
  templateUrl: './user-feature.component.html',
  styleUrl: './user-feature.component.css',
})
export class UserFeatureComponent {
  appState = inject(AppStore);
  router = inject(Router);
  service = inject(UserService);
  toastService = inject(ToastService);

  screenState = signal('SIGN_IN');

  signIn(value: UserSignInPayload) {
    this.service
      .signIn(value)
      .pipe(
        catchError((error) => {
          this.toastService.showMessage(
            'error',
            'Username or password incorrect!'
          );
          return EMPTY;
        }),
        tap((response) => {
          this.toastService.showMessage('success', 'Login success!');
        }),
        delay(500),
        tap((response) => {
          this.appState.setUser({ ...response, isAuthenticated: true });
          this.router.navigate(['/']);
        })
      )
      .subscribe();
  }

  signUp(value: UserSignUpPayload) {
    this.service
      .signUp(value)
      .pipe(
        catchError((error) => {
          this.toastService.showMessage('error', 'Register User Failed!');
          return EMPTY;
        }),
        tap((response: any) => {
          this.toastService.showMessage(
            'success',
            response.message || 'Success!'
          );
        }),
        delay(500),
        tap((response) => {
          this.changePage('SIGN_IN');
        })
      )
      .subscribe();
  }

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
    } else {
      console.log('Form Invalid');
    }
  }

  forgotPassword() {
    console.log('Forgot Password Clicked');
  }

  changePage(value: string) {
    this.screenState.set(value);
  }
}
