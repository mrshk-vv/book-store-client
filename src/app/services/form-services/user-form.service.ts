import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user';
import { UserSignUp } from 'src/app/models/user/user-sign-up';
import { isBlock } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  user: User
  userForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, Validators.required),
    isBlocked: new FormControl(null)
  }, {validators: this.passwordMatchedValidator})

  constructor() { }
  initinalizeUserForm(){
    this.userForm.setValue({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: null,
      confirmPassword: null,
      isBlocked: null
    })
  }

  populateUserForm(user: User){
    this.user = user
    this.userForm.setValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: null,
      confirmPassword: null,
      isBlocked: user.isBlocked
    })
  }

  userFromForm(): UserSignUp{
    return{
      id: this.id.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value
    }
  }

  get id(){
    return this.userForm.get('id') as FormControl
  }

  get firstName(){
    return this.userForm.get('firstName') as FormControl
  }

  get lastName(){
    return this.userForm.get('lastName') as FormControl
  }

  get email(){
    return this.userForm.get('email') as FormControl
  }

  get password(){
    return this.userForm.get('password') as FormControl
  }

  get confirmPassword(){
    return this.userForm.get('confirmPassword') as FormControl
  }

  passwordMatchedValidator(formGroup: FormGroup): Validators{
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ?  null : {notMatched: false}
  }
}
