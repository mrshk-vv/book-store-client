import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getAuthStatus, getRoleSelector } from 'src/app/store/account/account.selector';
import * as accountActions from 'src/app/store/account/account.actions';
import { AccountState } from 'src/app/store/account/account.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  authStatus$ = this.store.pipe(select(getAuthStatus))
  role: string

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.pipe(select(getRoleSelector)).subscribe(
      data => {
        this.role = data
      }
    )
  }

  signOut(){
    this.store.dispatch(accountActions.signOut())
    this.router.navigate([''])
  }

}
