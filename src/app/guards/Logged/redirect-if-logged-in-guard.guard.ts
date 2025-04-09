import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';

export const redirectIfLoggedInGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('key');

  if (token) {
    router.navigate(['/']);
    return of(false);
  }

  return of(true);
};
