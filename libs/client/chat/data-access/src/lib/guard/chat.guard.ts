import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChatGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = {};
    if (user) {
      return true; // Allow access if the user is authenticated
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false; // Prevent access to the route
    }
  }
}
