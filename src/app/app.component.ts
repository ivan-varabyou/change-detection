import { isZoneless as isZonelessConfig } from './../zone.config';
import { routes } from './app.routes';
import {
  ApplicationRef,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RootComponent } from './components/zone/root.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RootComponent, CommonModule],
  template: `<div>
      <a class="button" href="#">{{ isZoneless ? 'Zoneless' : 'Zone' }}</a>
      <a class="button" href="/dynamic">Dynamic</a>
    </div>
    <main class="tree">
      <div class="content">
        <router-outlet />
      </div>
    </main>`,
})
export class AppComponent {
  @ViewChild('parentCcontainer', { read: ViewContainerRef })
  parentContainer!: ViewContainerRef;
  isZoneless = isZonelessConfig;

  constructor(protected app: ApplicationRef, protected router: Router) {}

  runZone() {
    this.app.tick();
  }

  goTo(page: string) {
    this.router.navigateByUrl(page);
  }
}
