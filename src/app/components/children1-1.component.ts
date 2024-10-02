import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DefaultComponent } from './default.component';
import { Children111Component } from './children1-1-1.component';
import { Children112Component } from './children1-1-2.component';
import { AsyncPipe } from '@angular/common';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: '[children1-1]',
  standalone: true,
  imports: [Children111Component, Children112Component, AsyncPipe, PushPipe],
  template: ` {{ triggerChangeDetection() }}
    <div class="node {{ componentName }}">
      <div class="name">{{ componentName }}+ {{ inputSigal() }}</div>
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
          <button (click)="runInterval()">
            startInterval ngrxPush {{ bs$ | ngrxPush }}
          </button>
        </div>
        <div class="lch">
          <div class="constructor" #constructor>constructor</div>
          <div class="onChanges" #onChanges>onChanges</div>
          <div class="onInit" #onInit>onInit</div>
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
        <div children1-1-1 componentName="children1-1-1" nesting="4"></div>
        <div children1-1-2 componentName="children1-1-2"></div>
      </div>
    </div>`,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Children11Component extends DefaultComponent {}
