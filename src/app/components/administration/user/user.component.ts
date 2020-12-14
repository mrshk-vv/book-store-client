import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { debounceTime } from 'rxjs/internal/operators';
import { User } from 'src/app/models/user/user';
import { UserFormService } from 'src/app/services/form-services/user-form.service';
import { UserFilter } from 'src/app/shared/filters/user.filter';
import * as userActions from 'src/app/store/user/user.actions';
import { UserState } from 'src/app/store/user/user.reducer';
import * as userSelectors from 'src/app/store/user/user.selector';
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

  filter: UserFilter

  userName: string
  userNameSearchVisible: boolean

  status: boolean = false
  statusSelectVisible: boolean

  displayedColumns: string[] = ['userName', 'email', 'status', 'actions']

  constructor(private store: Store<UserState>,
              private dialog: MatDialog,
              private formService: UserFormService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.store.pipe(select(userSelectors.getPageSizeSelector)).subscribe(
      pageSize => {
        this.pageSize = pageSize
      }
    )
    this.store.pipe(select(userSelectors.getPageNumberSelector)).subscribe(
      pageNumber => {
        this.pageNumber = pageNumber
      }
    )
    this.store.dispatch(userActions.getUsers({
      paginationQuery: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      },
      filter: null
    }))
    this.store.pipe(select(userSelectors.getUsersSelector)).subscribe(
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
    this.store.dispatch(userActions.deleteUser({id: user.id}))
  }

  changeUserBlockStatus(user: User){
    this.store.dispatch(userActions.changeUserBlockStatus({id: user.id}))
  }

  openNextPage(){
    if(this.availabilityNextPage()){
      this.store.dispatch(userActions.getUsers({paginationQuery: {
        pageNumber: this.pageNumber + 1,
        pageSize: this.pageSize
      }, filter: this.filter}))
      this.store.pipe(select(userSelectors.getUsersSelector)).subscribe(
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
      this.store.dispatch(userActions.getUsers({paginationQuery: {
        pageNumber: this.pageNumber - 1,
        pageSize: this.pageSize
      }, filter: this.filter}))
      this.store.pipe(select(userSelectors.getUsersSelector)).subscribe(
        data => {
          this.users = data
        }
      )
    }
  }

  changeTableSize(){
    this.store.dispatch(userActions.getUsers({paginationQuery: {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }, filter: null}))
    this.store.pipe(select(userSelectors.getUsersSelector)).subscribe(
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
    this.store.pipe(select(userSelectors.getNextPageSelector)).subscribe(
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
    this.store.pipe(select(userSelectors.getPreviousPageSelector)).subscribe(
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

  changeStatus(){
    setTimeout(() => {
      this.statusSelectVisible = false
      if(status != null){
        this.applyFilter()
      }
    }, 2000)
  }

  applyFilter(){
    this.filter = {
      name: this.userName,
      status: this.status
    }
    this.store.dispatch(userActions.getUsers({
      paginationQuery: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      },
      filter: this.filter
    }))
    this.userNameSearchVisible = false
  }

}
