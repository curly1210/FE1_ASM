import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const token: any = localStorage.getItem('key');

  if (!token) {
    router.navigate(['/']);
    return of(false);
  }

  const infor: any = jwtDecode(token);

  if ((infor?.exp as any) < Date.now() / 1000) {
    router.navigate(['/']);
    return of(false);
  }

  return http.get(`http://localhost:3000/users?email=${infor.email}`).pipe(
    map((res: any) => {
      if (res.length > 0 && res[0].role === 'admin') {
        return true;
      }
      router.navigate(['/']);
      return false;
    }),
    catchError((err) => {
      router.navigate(['/']);
      return of(false);
    })
  );
};
