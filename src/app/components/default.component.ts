import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  input,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { isCdVisualiser, Style } from '../component.config';
import { distinctUntilChanged, fromEvent, interval, Observable } from 'rxjs';
import { ChildComponent } from './child.component';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: '[default]',
  standalone: true,
  imports: [ChildComponent, AsyncPipe],
  template: ` {{ triggerChangeDetection() }}
    <div class="node {{ componentName }}">
      <div class="name">{{ componentName }} + {{ inputSigal() }}</div>
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
            startInterval {{ bs$ | async }}
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
      <div>
        <!-- <div child componentName="child0"></div> -->
      </div>
      <div class="children {{ componentName }}">
        <ng-container #childrenContainer> </ng-container>
        <ng-content></ng-content>
      </div>
    </div>`,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DefaultComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() componentName: string = '';
  @Input() value: number = 0;
  @Input() inputText: string = '';

  // @Input() nesting: string = '1';
  @Input() style: Style = {
    color: 'black',
    background: 'greay',
  };

  @HostBinding('style.color') color = this.style.color;
  @HostBinding('style.background') background = this.style.background;

  @ViewChild('childrenContainer', { read: ViewContainerRef })
  public childrenContainer!: ViewContainerRef;
  @ViewChild('markForCheck') markForCheckButton?: ElementRef;
  @ViewChild('detectChanges') detectChangesButton?: ElementRef;
  @ViewChild('detach') detachButton?: ElementRef;
  @ViewChild('reattach') reattachButton?: ElementRef;
  @ViewChild('markAsDirty') markAsDirtyButton?: ElementRef;
  @ViewChild('inputBs') inputBs?: ElementRef;

  @ViewChild('constructor') constructorLch?: ElementRef;
  @ViewChild('onInit') onInitLch?: ElementRef;
  @ViewChild('onChanges') onChangesLch?: ElementRef;
  @ViewChild('AfterViewInit') afterViewInitLch?: ElementRef;
  @ViewChild('AfterViewChecked') afterViewCheckedLch?: ElementRef;
  @ViewChild('AfterContentInit') afterContentInitLch?: ElementRef;
  @ViewChild('AfterContentChecked')
  afterContentCheckedLch?: ElementRef;
  @ViewChild('doCheck') doCheckLch?: ElementRef;

  private timeout?: any;
  public count = 0;
  public speed = 50;
  public timeDelay = 0;
  public nesting = 1;

  public inputSigal = input<string>('inputSigal');

  public bs$?: Observable<number>;

  public runTimeout() {
    setTimeout(() => {}, 0);
  }

  public runInterval() {
    this.bs$ = interval(5000);
  }

  setInputText(value: string) {
    this.inputText = value;
  }

  public ngAfterViewInit(): void {
    this.print('ngAfterViewInit');
    const speed = this.speed;

    fromEvent(this.markForCheckButton?.nativeElement, 'click')
      .pipe()
      .subscribe(() => {
        this.markForCheckButton?.nativeElement.classList.add('active');
        this.cdr.markForCheck();
      });

    fromEvent(this.detectChangesButton?.nativeElement, 'click')
      .pipe()
      .subscribe(() => {
        this.detectChangesButton?.nativeElement.classList.add('active');
        this.cdr.detectChanges();
      });

    fromEvent(this.detachButton?.nativeElement, 'click')
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.detachButton?.nativeElement.classList.add('active');
        this.cdr.detach();
      });

    fromEvent(this.reattachButton?.nativeElement, 'click')
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.removeStyleTimeout(this.reattachButton?.nativeElement);
        this.detachButton?.nativeElement.classList.remove('active');
        this.cdr.reattach();
      });

    fromEvent(this.markAsDirtyButton?.nativeElement, 'click')
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.value++;
        this.markAsDirtyButton?.nativeElement.classList.add('dirty');
      });

    setTimeout(() => {
      this.afterViewInitLch?.nativeElement.classList.add('active');
      setTimeout(() => {
        this.afterViewInitLch?.nativeElement.classList.remove('active');
      }, 6 * this.speed);
    }, 6 * this.speed);
  }

  public removeStyleTimeout(element: any) {
    element.classList.add('active');
    setTimeout(() => {
      element.classList.remove('active');
    }, 1000);
  }

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) {
    this.print('constructor', this.componentName);
    if (!isCdVisualiser) return;

    setTimeout(() => {
      this.constructorLch?.nativeElement.classList.add('active');
      setTimeout(() => {
        this.constructorLch?.nativeElement.classList.remove('active');
      }, 0 * this.speed);
    }, 0 * this.speed);
  }

  public ngOnInit(): void {
    if (!isCdVisualiser) return;
    this.print('ngOnInit');

    setTimeout(() => {
      this.speed = this.speed + this.timeDelay;
      this.onInitLch?.nativeElement.classList.add('active');
      setTimeout(() => {
        this.onInitLch?.nativeElement.classList.remove('active');
      }, 1 * this.speed);
    }, 1 * this.speed);
  }

  public ngOnChanges(): void {
    if (!isCdVisualiser) return;
    performance.mark(this.componentName + 'start');
    this.print('ngOnChanges');
    // this.runColorLch(this.onChangesLch?.nativeElement);

    setTimeout(() => {
      this.onChangesLch?.nativeElement.classList.add('active');
      setTimeout(() => {
        this.onChangesLch?.nativeElement.classList.remove('active');
      }, 2 * this.speed);
    }, 2 * this.speed);
  }

  public ngDoCheck(): void {
    if (!isCdVisualiser) return;
    /* When OnPush is detected, disable the check-status */
    this.print('ngDoCheck');
    this.timeDelay = 0;

    setTimeout(() => {
      this.doCheckLch?.nativeElement.classList.add('active');
      setTimeout(() => {
        this.doCheckLch?.nativeElement.classList.remove('active');
      }, 3 * this.speed);
    }, 3 * this.speed);
  }

  public ngAfterContentInit(): void {
    if (!isCdVisualiser) return;
    this.print('ngAfterContentInit');

    setTimeout(() => {
      this.afterContentInitLch?.nativeElement.classList.add('active');
      setTimeout(() => {
        this.afterContentInitLch?.nativeElement.classList.remove('active');
      }, 4 * this.speed);
    }, 4 * this.speed);
  }

  public ngAfterContentChecked(): void {
    if (!isCdVisualiser) return;
    this.print('ngAfterContentChecked');

    setTimeout(() => {
      this.afterContentCheckedLch?.nativeElement.classList.add('active');
      setTimeout(() => {
        this.afterContentCheckedLch?.nativeElement.classList.remove('active');
      }, 5 * this.speed);
    }, 5 * this.speed);
  }

  public triggerChangeDetection() {
    if (!isCdVisualiser) return;

    this.print('template');

    performance.mark(this.componentName + 'end');

    performance.measure(
      `${this.componentName}start to ${this.componentName}end`,
      this.componentName + 'start',
      this.componentName + 'end'
    );
    const [measure] = performance.getEntriesByName(
      `${this.componentName}start to ${this.componentName}end`
    );
    this.timeDelay = measure.duration;
    this.speed = this.speed + this.timeDelay;

    setTimeout(() => {
      // this.print('changeDetectionTrigger');
      const nodeElement = this.el.nativeElement.querySelector('.name');
      nodeElement?.classList.add('checked');
      this.timeout = setTimeout(() => {
        nodeElement?.classList.remove('checked');
        const dirtyNumber = +this.markAsDirtyButton?.nativeElement.textContent
          .replace('(', '')
          .replace(')', '')
          .split(' ++ ')[1];
        if (dirtyNumber === this.value) {
          this.markAsDirtyButton?.nativeElement.classList.remove('dirty');
        }
        this.markForCheckButton?.nativeElement.classList.remove('active');
        this.detectChangesButton?.nativeElement.classList.remove('active');
        clearTimeout(this.timeout);
      }, 5 * this.speed);
    }, 5 * this.speed);
  }

  public ngAfterViewChecked(): void {
    if (!isCdVisualiser) return;
    this.print('ngAfterViewChecked');

    setTimeout(() => {
      this.afterViewCheckedLch?.nativeElement.classList.add('active');
      setTimeout(() => {
        this.afterViewCheckedLch?.nativeElement.classList.remove('active');
      }, 7 * this.speed);
    }, 7 * this.speed);
  }

  public ngOnDestroy(): void {
    this.print('ngOnDestroy');
    this.childrenContainer.clear();
  }

  private print(...message: string[]) {
    console.log(
      `%c ${this.componentName}`,
      `color: ${this.style.color}; background: 'greay'`,
      ...message
    );
  }
}
