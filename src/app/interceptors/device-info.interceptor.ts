import { HttpInterceptorFn } from '@angular/common/http';
import { UAParser } from "ua-parser-js";

export const deviceInfoInterceptor: HttpInterceptorFn = (req, next) => {
  const parser = new UAParser();
  const result = parser.getResult();
  const clonedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
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
    },
    withCredentials: true
  });

  return next(clonedRequest);
};
