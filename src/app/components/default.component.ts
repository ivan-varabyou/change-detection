import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  HostBinding,
  input,
  Input,
  InputSignal,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Style } from '../component.config';
import {
  BehaviorSubject,
  distinctUntilChanged,
  fromEvent,
  interval,
  Observable,
  of,
} from 'rxjs';
import { ChildComponent } from './child.component';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: '[default]',
  standalone: true,
  imports: [ChildComponent, AsyncPipe],
  template: `{{ triggerChangeDetection() }}
    <div class="node {{ componentName }}">
      <div class="name">{{ componentName }}</div>
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
          <div child componentName="child0"></div>
        </ng-container>

        <ng-content></ng-content>
      </div>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public isCorrectTime = false;

  public inputSigal = input<string>('0');

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

    this.zone.runOutsideAngular(() => {
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
    });
  }

  public removeStyleTimeout(element: any) {
    this.zone.runOutsideAngular(() => {
      element.classList.add('active');
      setTimeout(() => {
        element.classList.remove('active');
      }, 1000);
    });
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
    protected zone: NgZone
  ) {
    this.print('constructor', this.componentName);
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.constructorLch?.nativeElement.classList.add('active');
        setTimeout(() => {
          this.constructorLch?.nativeElement.classList.remove('active');
        }, 0 * this.speed);
      }, 0 * this.speed);
    });
  }

  public ngOnInit(): void {
    this.print('ngOnInit');

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.speed = this.speed + this.timeDelay;
        this.onInitLch?.nativeElement.classList.add('active');
        setTimeout(() => {
          this.onInitLch?.nativeElement.classList.remove('active');
        }, 1 * this.speed);
      }, 1 * this.speed);
    });
  }

  public ngOnChanges(): void {
    performance.mark(this.componentName + 'start');
    this.print('ngOnChanges');
    // this.runColorLch(this.onChangesLch?.nativeElement);
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.onChangesLch?.nativeElement.classList.add('active');
        setTimeout(() => {
          this.onChangesLch?.nativeElement.classList.remove('active');
        }, 2 * this.speed);
      }, 2 * this.speed);
    });
  }

  public ngDoCheck(): void {
    /* When OnPush is detected, disable the check-status */
    this.print('ngDoCheck');
    this.timeDelay = 0;

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.doCheckLch?.nativeElement.classList.add('active');
        setTimeout(() => {
          this.doCheckLch?.nativeElement.classList.remove('active');
        }, 3 * this.speed);
      }, 3 * this.speed);
    });
  }

  public ngAfterContentInit(): void {
    this.print('ngAfterContentInit');
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.afterContentInitLch?.nativeElement.classList.add('active');
        setTimeout(() => {
          this.afterContentInitLch?.nativeElement.classList.remove('active');
        }, 4 * this.speed);
      }, 4 * this.speed);
    });
  }

  public ngAfterContentChecked(): void {
    this.print('ngAfterContentChecked');

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.afterContentCheckedLch?.nativeElement.classList.add('active');
        setTimeout(() => {
          this.afterContentCheckedLch?.nativeElement.classList.remove('active');
        }, 5 * this.speed);
      }, 5 * this.speed);
    });
  }

  public triggerChangeDetection() {
    this.zone.runOutsideAngular(() => {
      this.print('template');
      this.zone.runOutsideAngular(() => {
        if (this.isCorrectTime) {
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
        }

        setTimeout(() => {
          // this.print('changeDetectionTrigger');
          const nodeElement = this.el.nativeElement.querySelector('.name');
          nodeElement?.classList.add('checked');
          this.timeout = setTimeout(() => {
            nodeElement?.classList.remove('checked');
            const dirtyNumber =
              +this.markAsDirtyButton?.nativeElement.textContent
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
      });
    });
  }

  public ngAfterViewChecked(): void {
    this.print('ngAfterViewChecked');
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.afterViewCheckedLch?.nativeElement.classList.add('active');
        setTimeout(() => {
          this.afterViewCheckedLch?.nativeElement.classList.remove('active');
        }, 7 * this.speed);
      }, 7 * this.speed);
    });
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
