import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from '../../public/mypreset';
import { graphqlProvider } from './config/helper-class/graphql.provider';


export const appConfig: ApplicationConfig = {
  providers: [

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([
    ])),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind, primeng',
            options: {
              darkModeSelector: '.my-app-dark'
            }
          },
        }
      }
      }),
    graphqlProvider
  ]
};
