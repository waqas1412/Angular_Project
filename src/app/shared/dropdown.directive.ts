import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') toggle = false;
  @HostListener('click') toggleDropdown() {
    this.toggle = !this.toggle;
  }
  constructor() {}
}
