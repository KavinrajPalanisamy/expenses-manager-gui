import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { UAParser } from "ua-parser-js";

import { AuthService } from "../services/auth.service";
import { catchError, switchMap, throwError } from 'rxjs';

const parser = new UAParser();
const result = parser.getResult();

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  const buildHeaders = (token: string) => ({
    accessToken: token,
    'X-Browser': result.browser.name ?? '',
    'X-Browser-Version': result.browser.version ?? '',
    'X-OS': result.os.name ?? '',
    'X-OS-Version': result.os.version ?? '',
    'X-Device-Type': result.device.type ?? 'desktop',
    'X-Device-Vendor': result.device.vendor ?? '',
    'X-Device-Model': result.device.model ?? '',
    'X-Language': navigator.language,
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    'X-Platform': navigator.platform
  });

  if (accessToken) {
    const cloneRequest = req.clone({ setHeaders: buildHeaders(accessToken) });

    return next(cloneRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error?.code === 'ACCESS_TOKEN_EXPIRED') {
          return authService.refreshToken().pipe(
            switchMap((res) => {
              const retryReq = req.clone({ setHeaders: buildHeaders(res.accessToken) });
              return next(retryReq);
            }),
            catchError(() => {
              authService.logOut(error.name).subscribe();
              return throwError(() => error);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
