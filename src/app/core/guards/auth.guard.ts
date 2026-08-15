import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const isValidSession = inject(AuthService).verifySession();
  const router = inject(Router);

  if (isValidSession) {
    return true;
  }

  return router.createUrlTree([''], {
    queryParams: { returnUrl: state.url }
  })

};
