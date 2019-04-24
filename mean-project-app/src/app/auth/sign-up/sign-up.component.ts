import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component( {
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
} )
export class SignUpComponent implements OnInit {

  constructor( private authService: AuthService ) { }
  signUpForm: FormGroup;
  buttonStatus = false;

  ngOnInit() {
    this.signUpForm = new FormGroup( {
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, [Validators.required] )
    } );

    // Check from statue

    this.signUpForm.statusChanges
      .subscribe( status => {
        this.buttonStatus = status.toLowerCase() === 'valid' ? true : false;
      } );
  }

  onSignup() {
    this.authService.signUp( this.signUpForm.value );
  }

}
