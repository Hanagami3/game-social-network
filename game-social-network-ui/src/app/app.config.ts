import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withComponentInputBinding, withRouterConfig} from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi
} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {HttpTokenInterceptor} from "./services/interceptor/http-token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })),
    provideHttpClient(withInterceptorsFromDi()),
  ]
};

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }),
//     provideAnimations(),
//     provideRouter(routes),
//     importProvidersFrom(
//       HttpClient  // Ajoutez `HttpClient` ici pour les fonctionnalités HTTP
//     ),
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: HttpTokenInterceptor,
//       multi: true
//     }
//   ]
// };
