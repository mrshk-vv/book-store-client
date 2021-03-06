import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import * as accountActions from 'src/app/store/account/account.actions';
import { getAuthMessage } from 'src/app/store/account/account.selector';

@Component({
  selector: 'app-sign-in',
  templateUrl:'./sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup
  formSubmited: boolean
  message: string

  constructor(public store: Store,
              private formBuilder: FormBuilder,
              private router: Router,
  ) {}

  ngOnInit(): void {
    this.createSignInForm();
  }

  createSignInForm(){
    this.signInForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  signIn(){
    this.formSubmited = true
    if(this.signInForm.valid){
      this.store.dispatch(accountActions.signIn({
        email: this.email.value,
        password: this.password.value
      }))
      this.store.select(getAuthMessage).subscribe(
        errorMessage => {
          this.message = errorMessage
          console.log(errorMessage)
        }
      )
    }
  }

  get email(){
    return this.signInForm.get('email') as FormGroup
  }

  get password(){
    return this.signInForm.get('password') as FormGroup
  }

}
