import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { persistState } from '@datorama/akita';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: 'persistStorage',
      useValue: persistState({ include: ['weather'], storage: localStorage }),
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
  ],
};
