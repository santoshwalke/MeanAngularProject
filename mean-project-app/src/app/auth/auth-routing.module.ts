import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthRoutingRoutingModule } from './auth-routing-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
      SignInComponent,
      SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthRoutingModule { }
