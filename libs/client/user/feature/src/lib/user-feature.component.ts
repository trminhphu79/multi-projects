import { AppStore } from '@client/store/store';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterComponent } from '@client/user/register';

@Component({
  selector: 'lib-user-feature',
  standalone: true,
  imports: [CommonModule, RegisterComponent, ReactiveFormsModule],
  templateUrl: './user-feature.component.html',
  styleUrl: './user-feature.component.css',
})
export class UserFeatureComponent {
  appState = inject(AppStore);
  router = inject(Router);

  signIn() {
    this.appState.setUser({
      id: 123,
      email: 'trminhphu79@gmail.com',
      isAuthenticated: true,
    });
    this.router.navigate(['/']);
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

  onForgotPassword() {
    console.log('Forgot Password Clicked');
  }
}
