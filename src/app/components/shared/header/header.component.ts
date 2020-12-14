import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getAuthStatus, getRoleSelector } from 'src/app/store/account/account.selector';
import * as accountActions from 'src/app/store/account/account.actions';
import { AccountState } from 'src/app/store/account/account.reducer';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CheckoutComponent } from '../../order/checkout/checkout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  authStatus: boolean
  isAdmin: boolean

  constructor(private store: Store<AccountState>,
              private router: Router,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.store.select(getRoleSelector).subscribe(
      (data) => {
        if(data == 'Admin'){
          this.isAdmin = true
        }
        if(data == 'Client'){
          this.isAdmin = false
        }
        console.log(data)
      })
    this.store.select(getAuthStatus).subscribe(
      (status) =>{
        this.authStatus = status
      }
    )
  }

  openShopCart(){
    let config: MatDialogConfig = {
      width: "70%"
    }
    this.dialog.open(CheckoutComponent, config)
  }

  signOut(){
    this.store.dispatch(accountActions.signOut())
    this.router.navigate([''])
  }

}
