import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './services/authentication.service'; 
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
