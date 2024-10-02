import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DefaultComponent } from './default.component';
import { Children11Component } from './children1-1.component';
import { Children12Component } from './children1-2.component';

@Component({
  selector: '[children1]',
  standalone: true,
  imports: [Children11Component, Children12Component],
  template: ` {{ triggerChangeDetection() }}
    <div class="node {{ componentName }}">
      <div class="name">{{ componentName }} + {{ children0signal() }}</div>
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

          <button (click)="setChildren0Signal()">signal children1</button>
          <button (click)="setChildren1Signal()">signal children1-1</button>
          <button (click)="setChildren1Signa2()">signal children1-2</button>
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
        <div
          children1-1
          componentName="children1-1"
          [inputSigal]="children1signal()"
        ></div>
        <div
          children1-2
          componentName="children1-2"
          [inputSigal]="children2signal()"
        ></div>
      </div>
    </div>`,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Children1Component extends DefaultComponent {
  public children0signal = signal('0');
  public children1signal = signal('0');
  public children2signal = signal('0');

  setChildren0Signal() {
    this.children0signal.update((v) => String(+v + 1));
  }

  setChildren1Signal() {
    this.children1signal.update((v) => String(+v + 1));
  }

  setChildren1Signa2() {
    this.children2signal.update((v) => String(+v + 1));
  }
}
