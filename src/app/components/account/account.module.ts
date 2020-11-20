import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { accountReducer, ACCOUNT_REDUCER_NODE } from 'src/app/store/account/account.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from 'src/app/store/account/account.effects';
import { RouterModule, Routes } from '@angular/router';


import { SignInComponent } from './sing-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  {
    path:'account/signUp', component: SignUpComponent
  },
  {
    path:'account/signIn', component: SignInComponent
  },
  {
    path:'account/forgetPassword', component: ForgetPasswordComponent
  },
  {
    path:'account/confirmEmail', component: ConfirmEmailComponent
  }
];

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    ForgetPasswordComponent,
    ConfirmEmailComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    StoreModule.forFeature(ACCOUNT_REDUCER_NODE, accountReducer),
    EffectsModule.forFeature([AccountEffects]),

    MatButtonModule
  ],
  exports:[
    MatButtonModule
  ]
})
export class AccountModule { }
