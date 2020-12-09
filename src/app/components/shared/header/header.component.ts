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
})
export class HeaderComponent implements OnInit {

  authStatus$ = this.store.pipe(select(getAuthStatus))
  role: string

  constructor(private store: Store,
              private router: Router,
              private dialog: MatDialog) {
    store.pipe(select(getRoleSelector)).subscribe(
      data => {
        this.role = data
      }
    )
    console.log(this.role)
  }

  ngOnInit(): void {
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
