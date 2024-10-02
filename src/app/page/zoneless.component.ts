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
import { ComponentConfig, config } from '../../zone.config';
import { RootComponent } from '../components/zonelesss/root.component';
import { DefaultComponent } from '../components/zonelesss/default.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RootComponent],
  template: `<h1>Zoneless</h1>
    <div root componentName="root default tree"></div> `,
})
export class ZonelessComponent {
  @ViewChild('parentCcontainer', { read: ViewContainerRef })
  parentContainer!: ViewContainerRef;

  constructor(protected app: ApplicationRef) {}

  ngOnInit(): void {}
}
