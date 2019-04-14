import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService) { }

  signInForm: FormGroup;
  buttonStatus = false;

  ngOnInit() {
    this.signInForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required])
    });

    // Check form status is this valid or not
    this.signInForm.statusChanges
    .subscribe(status => {
        this.buttonStatus = status.toLowerCase() === 'valid' ? true : false;
    });
  }

  onSignInSubmit() {
      this.authService.signIn(this.signInForm.value);
    //   console.log(this.signInForm);
  }

}
