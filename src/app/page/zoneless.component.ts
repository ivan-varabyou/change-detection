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
import { DefaultComponent } from '../components/zoneless/default.component';
import { RootComponent } from '../components/zoneless/root.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RootComponent],
  template: ` <div root componentName="root default tree"></div> `,
})
export class ZonelessComponent {
  @ViewChild('parentCcontainer', { read: ViewContainerRef })
  parentContainer!: ViewContainerRef;

  constructor(protected app: ApplicationRef) {}

  ngOnInit(): void {}
}
