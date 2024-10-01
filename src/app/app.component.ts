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
  template: `<h1>ZONE.JS</h1>
    <main class="tree">
      <div class="content">
        <router-outlet />
      </div>
    </main>

    <button (click)="runZone()">run zone JS</button>`,
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
