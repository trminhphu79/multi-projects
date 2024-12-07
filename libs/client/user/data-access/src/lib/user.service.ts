import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Injectable } from '@nestjs/common';
import { UserSignInPayload, UserSignUpPayload } from './user.model';
import { of } from 'rxjs';

@Injectable()
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/auth/';

  signIn(payload: UserSignInPayload) {
    return this.http.post(`${this.baseUrl}authenticate`, payload);
  }

  signUp(payload: UserSignUpPayload) {
    return this.http.post(`${this.baseUrl}registation`, payload);
  }
}
