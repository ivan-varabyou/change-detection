import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ZoneComponent } from './page/zone.component';
import { DynamicComponent } from './page/dynamic.component';
import { ZonelessComponent } from './page/zoneless.component';

export const routes: Routes = [
  {
    path: '',
    component: ZoneComponent,
  },
  {
    path: 'zoneless',
    component: ZonelessComponent,
  },

  {
    path: 'dynamic',
    component: DynamicComponent,
  },
];
