import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppDropDown]',
  exportAs: 'appAppDropDown'
})
export class AppDropDownDirective {

  constructor() { }

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleopen() {
     console.log(1);
     this.isOpen = !this.isOpen;
  }

}
