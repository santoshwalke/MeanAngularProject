import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppDropDownDirective } from './app-drop-down.directive';

@NgModule({
  declarations: [
    AppDropDownDirective
  ],
  imports : [
  CommonModule
  ],
  exports: [
    AppDropDownDirective
  ]
})
export class SharedModule { }
