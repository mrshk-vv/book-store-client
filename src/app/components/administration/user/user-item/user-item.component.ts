import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UserSignUp } from 'src/app/models/user/user-sign-up';
import { UserFormService } from 'src/app/services/form-services/user-form.service';
import { editUser } from 'src/app/store/user/user.actions';
import { UserState } from 'src/app/store/user/user.reducer';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  constructor(public formService: UserFormService,
              private dialog: MatDialogRef<UserItemComponent>,
              private store: Store<UserState>) { }

  ngOnInit(): void {
  }


  onSubmit(){
    if(this.formService.userForm.valid){
      let userToEdit: UserSignUp = this.formService.userFromForm()
      this.store.dispatch(editUser({userToEdit: userToEdit}))
      this.onClose()
    }
  }

  onClose(){
    this.formService.initinalizeUserForm()
    this.dialog.close()
  }
}
