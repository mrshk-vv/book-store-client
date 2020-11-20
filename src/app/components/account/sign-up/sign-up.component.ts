import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as accountActions from 'src/app/store/account/account.actions';
import { select, Store } from '@ngrx/store';
import { getAuthMessage, getSignedUpStatus } from 'src/app/store/account/account.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpState$ = this.store.pipe(select(getSignedUpStatus))
  authMessage$ = this.store.pipe(select(getAuthMessage))

  signUpForm: FormGroup;
  formSubmited: boolean;

  constructor(private formBuilder: FormBuilder, private store : Store, private router: Router) { }

  ngOnInit(): void {
    this.createSignUpForm()
  }

  signUp(){
    if(this.signUpForm.valid){
      this.store.dispatch(accountActions.singUp({
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        password: this.password.value
    }))
  }
  }

  createSignUpForm(){
    this.signUpForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
    }, {validators: this.passwordMatchedValidator}
    )
  }

  get firstName(){
    return this.signUpForm.get('firstName') as FormControl
  }

  get lastName(){
    return this.signUpForm.get('lastName') as FormControl
  }

  get email(){
    return this.signUpForm.get('email') as FormControl
  }

  get password(){
    return this.signUpForm.get('password') as FormControl
  }

  get confirmPassword(){
    return this.signUpForm.get('confirmPassword') as FormControl
  }

  passwordMatchedValidator(formGroup: FormGroup): Validators{
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ?  null : {notMatched: false}
  }

}
