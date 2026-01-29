import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[cartHover]',
  standalone: true,
})
export class CartHoverDirective {
  private defaultBg = 'transparent';

  private hoverColor = '#f0ba4e';

  bgColor = this.defaultBg;

  @HostBinding('style.backgroundColor')
  get background() {
    return this.bgColor;
  }

  @HostBinding('style.border')
  get border() {
    return `2px solid ${this.hoverColor}`;
  }

  @HostListener('mouseenter')
  onEnter() {
    this.bgColor = this.hoverColor;
  }

  @HostListener('mouseleave')
  onLeave() {
    this.bgColor = this.defaultBg;
  }
}
