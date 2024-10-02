import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ZoneComponent } from './page/zone.component';
import { DynamicComponent } from './page/dynamic.component';
import { ZonelessComponent } from './page/zoneless.component';
import { isZoneless } from '../zone.config';

export const routes: Routes = [
  {
    path: '',
    component: isZoneless ? ZonelessComponent : ZoneComponent,
  },

  {
    path: 'dynamic',
    component: DynamicComponent,
  },
];
