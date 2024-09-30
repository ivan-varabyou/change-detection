import {
  AfterContentInit,
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RootComponent } from './components/root.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RootComponent],
  template: `<a routerLink="/zone">CH + Zone</a>
    <a routerLink="/dynamic">CH + Zone + Dynamic</a>
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

  constructor(protected app: ApplicationRef) {}

  runZone() {
    this.app.tick();
  }
}
