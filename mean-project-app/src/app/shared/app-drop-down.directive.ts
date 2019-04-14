import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppDropDown]',
  exportAs: 'appAppDropDown'
})
export class AppDropDownDirective {

  constructor() { }

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleopen() {
     this.isOpen = !this.isOpen;
  }

}
