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
  template: `<h1>Dynamic Component</h1>
    <ng-container #parentCcontainer></ng-container> `,
})
export class DynamicComponent implements AfterViewInit {
  @ViewChild('parentCcontainer', { read: ViewContainerRef })
  parentContainer!: ViewContainerRef;
  public i = 0; // Счетчик для значений компонентов

  constructor(protected app: ApplicationRef) {}

  ngOnInit(): void {
    console.group('AppComponent');
  }

  ngAfterViewInit(): void {
    this.renderComponents(config, this.parentContainer, DefaultComponent);
    console.groupEnd();
  }

  runZone() {
    this.app.tick();
  }

  public renderComponents(
    config: ComponentConfig,
    container: ViewContainerRef,
    componentType: Type<DefaultComponent>
  ): void {
    this.createComponentRecursively(config, container, componentType);
  }

  private createComponentRecursively(
    config: ComponentConfig,
    container: ViewContainerRef,
    componentType: Type<DefaultComponent>
  ): ComponentRef<DefaultComponent> {
    // Создаем компонент
    const component = container.createComponent(componentType);

    // Устанавливаем свойства для компонента
    component.instance.componentName = config.componentName;
    component.instance.style = config.style;
    component.instance.value = this.i++; // Используем значение счетчика

    // Если есть дочерние компоненты, создаем их рекурсивно
    if (config.children && config.children.length > 0) {
      for (const childConfig of config.children) {
        this.createComponentRecursively(childConfig, container, componentType);
      }
    }

    return component;
  }
}
