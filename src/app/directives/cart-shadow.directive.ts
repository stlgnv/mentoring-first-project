import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[cartShadow]',
  standalone: true,
})
export class CartShadowDirective {
  private shadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
  private noShadow = 'none';

  @HostBinding('style.boxShadow') boxShadow!: string;
  @HostBinding('style.transition') transition = 'box-shadow 0.3s ease';

  @HostListener('mouseenter')
  onEnter() {
    this.boxShadow = this.shadow;
  }

  @HostListener('mouseleave')
  onLeave() {
    this.boxShadow = this.noShadow;
  }
}
