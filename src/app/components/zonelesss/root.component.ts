import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DefaultComponent } from './default.component';
import { Children1Component } from './children1.component';
import { Children2Component } from './children2.component';

@Component({
  selector: '[root]',
  standalone: true,
  imports: [Children1Component, Children2Component],
  template: ` {{ triggerChangeDetection() }}
    <div class="node {{ componentName }}">
      <div class="name">
        {{ componentName }}
      </div>
      <div class="bar">
        <div class="buttons">
          <button class="markForCheck" #markForCheck>MFC</button>
          <button class="detectChanges" #detectChanges>DC</button>
          <button class="detach" #detach>Detach</button>
          <button class="reattach" #reattach>Rattach</button>
          <button class="markAsDirty" #markAsDirty>
            Dirty ++ ({{ value }})
          </button>
          <button (click)="runTimeout()">runTimeout</button>
        </div>
        <div class="lch">
          <div class="constructor" #constructor>constructor</div>
          <div class="onInit" #onInit>onInit</div>
          <div class="onChanges" #onChanges>onChanges</div>
          <div class="doCheck" #doCheck>doCheck</div>
          <div class="AfterContentInit" #AfterContentInit>AfterContentInit</div>
          <div class="AfterContentChecked" #AfterContentChecked>
            AfterContentChecked
          </div>
          <div class="AfterViewInit" #AfterViewInit>AfterViewInit</div>
          <div class="AfterViewChecked" #AfterViewChecked>AfterViewChecked</div>
        </div>
      </div>
      <div class="children {{ componentName }}">
        <ng-container #childrenContainer>
          <ng-content></ng-content>
        </ng-container>
        <div children1 componentName="children1" nesting="2"></div>
        <div children2 componentName="children2" nesting="2"></div>
      </div>
    </div>`,
})
export class RootComponent extends DefaultComponent {}
