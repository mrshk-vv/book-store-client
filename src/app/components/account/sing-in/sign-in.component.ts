import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import * as accountActions from 'src/app/store/account/account.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl:'./sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup
  formSubmited: boolean
  constructor(public store: Store,
              private formBuilder: FormBuilder,
              private router: Router,
  ) { }

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
    }
  }

  get email(){
    return this.signInForm.get('email') as FormGroup
  }

  get password(){
    return this.signInForm.get('password') as FormGroup
  }

}
