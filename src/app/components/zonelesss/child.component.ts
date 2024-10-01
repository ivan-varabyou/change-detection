import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Style } from '../../../zone.config';
import { distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: '[child]',
  standalone: true,
  imports: [],
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
        <div class="children {{ componentName }}">
          <ng-container #childrenContainer> </ng-container>
          <ng-content></ng-content>
        </div>
        <div children componentName="children"></div>
      </div>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() componentName: string = '';
  @Input() value: number = 0;
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
  public time = 1000;
  public count = 0;
  public isFirstRun = true;
  public speed = 200;
  public triggerChangeDetection() {
    this.zone.runOutsideAngular(() => {
      this.print('template');
      this.zone.runOutsideAngular(() => {
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
        }, 2000);
      });
    });
  }

  public runTimeout() {
    setTimeout(() => {}, 0);
  }

  public ngAfterViewInit(): void {
    this.print('ngAfterViewInit');
    const speed = this.speed;

    // this.zone.runOutsideAngular(() => {
    //   this.constructorLch?.nativeElement.classList.add('active');
    //   setTimeout(() => {
    //     this.constructorLch?.nativeElement.classList.remove('active');
    //     this.onInitLch?.nativeElement.classList.add('active');
    //     setTimeout(() => {
    //       this.onInitLch?.nativeElement.classList.remove('active');
    //       this.doCheckLch?.nativeElement.classList.add('active');
    //       setTimeout(() => {
    //         this.doCheckLch?.nativeElement.classList.remove('active');

    //         this.afterContentInitLch?.nativeElement.classList.add('active');
    //         setTimeout(() => {
    //           this.afterContentInitLch?.nativeElement.classList.remove(
    //             'active'
    //           );

    //           this.afterContentCheckedLch?.nativeElement.classList.add(
    //             'active'
    //           );
    //           setTimeout(() => {
    //             this.afterContentCheckedLch?.nativeElement.classList.remove(
    //               'active'
    //             );

    //             this.afterViewInitLch?.nativeElement.classList.add('active');
    //             setTimeout(() => {
    //               this.afterViewInitLch?.nativeElement.classList.remove(
    //                 'active'
    //               );

    //               this.afterViewCheckedLch?.nativeElement.classList.add(
    //                 'active'
    //               );
    //               setTimeout(() => {
    //                 this.afterViewCheckedLch?.nativeElement.classList.remove(
    //                   'active'
    //                 );
    //               }, speed);
    //             }, speed);
    //           }, speed);
    //         }, speed);
    //       }, speed);
    //     }, speed);
    //   }, speed);
    // });

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
    // this.runColorLch(this.constructorLch?.nativeElement);
  }

  public ngOnInit(): void {
    this.print('ngOnInit');
    this.zone.runOutsideAngular(() => {
      this.onInitLch?.nativeElement.classList.add('active');
      setTimeout(() => {
        this.onInitLch?.nativeElement.classList.remove('active');
      }, 1000);
    });
  }

  public ngOnChanges(): void {
    this.print('ngOnChanges');
    // this.runColorLch(this.onChangesLch?.nativeElement);
    this.zone.runOutsideAngular(() => {
      this.onChangesLch?.nativeElement.classList.add('active');
      setTimeout(() => {
        this.onChangesLch?.nativeElement.classList.remove('active');
      }, 1000);
    });
  }

  public ngDoCheck(): void {
    /* When OnPush is detected, disable the check-status */
    this.print('ngDoCheck');
    if (!this.isFirstRun) {
      this.zone.runOutsideAngular(() => {
        this.doCheckLch?.nativeElement.classList.add('active');
        setTimeout(() => {
          this.doCheckLch?.nativeElement.classList.remove('active');
        }, this.speed);
      });
    }
  }

  public ngAfterViewChecked(): void {
    this.print('ngAfterViewChecked');
    console.groupEnd();
    if (!this.isFirstRun) {
      this.zone.runOutsideAngular(() => {
        this.afterViewCheckedLch?.nativeElement.classList.add('active');
        setTimeout(() => {
          this.afterViewCheckedLch?.nativeElement.classList.remove('active');
        }, this.speed);
      });
    }
    this.isFirstRun = true;
  }

  public ngAfterContentChecked(): void {
    this.print('ngAfterContentChecked');
    console.groupEnd();
    if (!this.isFirstRun) {
      this.zone.runOutsideAngular(() => {
        this.afterContentCheckedLch?.nativeElement.classList.add('active');
        setTimeout(() => {
          this.afterContentCheckedLch?.nativeElement.classList.remove('active');
        }, this.speed);
      });
    }
    this.isFirstRun = true;
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
