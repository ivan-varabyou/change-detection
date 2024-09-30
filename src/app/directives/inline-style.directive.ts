import { Directive, HostBinding, Input } from '@angular/core';
import { Style } from '../component.config';

@Directive({
  selector: '[appInlineStyle]',
  standalone: true,
})
export class InlineStyleDirective {
  constructor() {}
  @Input() directiveName: string = 'InlineStyleDirective';
  @Input({ required: true }) style: Style = {
    color: 'black',
    background: 'greay',
  };

  @HostBinding('style.color') color = this.style.color;
  @HostBinding('style.background') background = this.style.background;

  ngOnInit(): void {
    console.group(this.directiveName);
    this.print('ngOnInit');
  }

  ngOnChanges(): void {
    this.print('ngOnChanges');
  }

  ngAfterViewInit(): void {
    this.print('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    this.print('ngAfterViewChecked');
  }

  ngAfterContentInit(): void {
    this.print('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    this.print('ngAfterContentChecked');
  }

  ngOnDestroy(): void {
    this.print('ngOnDestroy');
  }

  private print(...message: string[]) {
    console.log(...message);
  }
}
