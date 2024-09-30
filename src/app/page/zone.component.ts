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
import { ComponentConfig, config } from '../component.config';
import { DefaultComponent } from '../components/default.component';
import { RootComponent } from '../components/root.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RootComponent],
  template: ` <div root componentName="root default tree"></div> `,
})
export class ZoneComponent {
  @ViewChild('parentCcontainer', { read: ViewContainerRef })
  parentContainer!: ViewContainerRef;

  constructor(protected app: ApplicationRef) {}

  ngOnInit(): void {}
}
