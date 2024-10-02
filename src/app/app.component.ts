import { routes } from './app.routes';
import {
  ApplicationRef,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RootComponent } from './components/zone/root.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RootComponent],
  template: `<div>
      <button (click)="goTo('')">Zone</button>
      <button (click)="goTo('zoneless')">Zoneless</button>
      <button (click)="goTo('dynamic')">Dynamic</button>
      <button (click)="runZone()">run zone JS</button>
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

  constructor(protected app: ApplicationRef, protected router: Router) {}

  runZone() {
    this.app.tick();
  }

  goTo(page: string) {
    this.router.navigate([page]);
  }
}
