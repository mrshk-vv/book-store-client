import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as accountActions from 'src/app/store/account/account.actions';
import { getAuthMessage, getPasswordResetStatus } from 'src/app/store/account/account.selector';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  authMessage$ = this.store.pipe(select(getAuthMessage))
  passwordResetStatus$ = this.store.pipe(select(getPasswordResetStatus))

  forgetPasswordForm: FormGroup
  formSubmited: boolean
  constructor(public store: Store, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    })
  }

  forgotPassword(){
    if(this.forgetPasswordForm.valid){
      this.store.dispatch(accountActions.forgetPassword({email: this.email.value}))
    }
  }

  get email(){
    return this.forgetPasswordForm.get('email') as FormGroup
  }

}
