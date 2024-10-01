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
import { DefaultComponent } from '../components/zone/default.component';
import { RootComponent } from '../components/zone/root.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RootComponent],
  template: `<h1>Zone JS</h1>
    <div root componentName="root default tree"></div> `,
})
export class ZoneComponent {
  @ViewChild('parentCcontainer', { read: ViewContainerRef })
  parentContainer!: ViewContainerRef;

  constructor(protected app: ApplicationRef) {}

  ngOnInit(): void {}
}
