import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/models/user/user';
import { UserFormService } from 'src/app/services/form-services/user-form.service';
import { changeUserBlockStatus,
         deleteUser,
         getUsers } from 'src/app/store/user/user.actions';
import { UserState } from 'src/app/store/user/user.reducer';
import { getPageSizeSelector,
         getPageNumberSelector,
         getUsersSelector,
         getPreviousPageSelector,
         getNextPageSelector } from 'src/app/store/user/user.selector';
import { UserItemComponent } from './user-item/user-item.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[]

  pageNumber: number
  pageSize: number

  nextPage: boolean = false
  previousPage: boolean = true

  displayedColumns: string[] = ['userName', 'email', 'status', 'actions']

  constructor(private store: Store<UserState>,
              private dialog: MatDialog,
              private formService: UserFormService) { }

  ngOnInit(): void {
    this.store.pipe(select(getPageSizeSelector)).subscribe(
      pageSize => {
        this.pageSize = pageSize
      }
    )
    this.store.pipe(select(getPageNumberSelector)).subscribe(
      pageNumber => {
        this.pageNumber = pageNumber
      }
    )
    this.store.dispatch(getUsers({
      paginationQuery: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      },
      filter: null
    }))
    this.store.pipe(select(getUsersSelector)).subscribe(
      data => {
        this.users = data
      }
    )
  }

  editUser(user: User){
    this.formService.populateUserForm(user)
    this.dialog.open(UserItemComponent)
  }

  deleteUser(user: User){
    this.store.dispatch(deleteUser({id: user.id}))
  }

  changeUserBlockStatus(user: User){
    this.store.dispatch(changeUserBlockStatus({id: user.id}))
  }

  openNextPage(){
    if(this.availabilityNextPage()){
      this.store.dispatch(getUsers({paginationQuery: {
        pageNumber: this.pageNumber + 1,
        pageSize: this.pageSize
      }, filter: null}))
      this.store.pipe(select(getUsersSelector)).subscribe(
        data => {
            this.users = data
            if(data.length < this.pageSize){
              this.nextPage = true
            }
        }
      )
    }
  }

  openPreviousPage(){
    if(this.availabilityPreviousPage()){
      this.store.dispatch(getUsers({paginationQuery: {
        pageNumber: this.pageNumber - 1,
        pageSize: this.pageSize
      }, filter: null}))
      this.store.pipe(select(getUsersSelector)).subscribe(
        data => {
          this.users = data
        }
      )
    }
  }

  changeTableSize(){
    this.store.dispatch(getUsers({paginationQuery: {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }, filter: null}))
    this.store.pipe(select(getUsersSelector)).subscribe(
      data => {
        this.users = data
        if(data.length <= this.pageSize){
          this.nextPage = true
        }
        this.nextPage = false
      }
    )
    this.availabilityNextPage()
    this.availabilityPreviousPage()
  }

  availabilityNextPage(): boolean{
    this.store.pipe(select(getNextPageSelector)).subscribe(
      data => {
        if(data === null){
          this.nextPage = true
          return true;
        }else{
          this.nextPage = false
          return false
        }
      }
    )
    this.previousPage = false
    return true
  }

  availabilityPreviousPage(): boolean{
    this.store.pipe(select(getPreviousPageSelector)).subscribe(
      data => {
        if(data === null){
          this.previousPage = true
          return true
        }else{
          this.nextPage = false
          return false
        }
      }
    )
    this.nextPage = false
    return true
  }

}
