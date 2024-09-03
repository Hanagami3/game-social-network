import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.headers.get('No-Auth') == 'True') {
    return next(req);
  }

  if (typeof window !== 'undefined') {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      //TODO redirection vers la page d'authentification
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return next(authReq);
  }
  return next(req);
}
