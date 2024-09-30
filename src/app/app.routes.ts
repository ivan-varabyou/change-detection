import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ZoneComponent } from './page/zone.component';
import { DynamicComponent } from './page/dynamic.component';

export const routes: Routes = [
  {
    path: '',
    component: ZoneComponent,
  },
];
