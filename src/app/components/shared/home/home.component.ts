import { Component, OnInit } from '@angular/core';
import { select, State, Store } from '@ngrx/store';
import { Key } from 'protractor';
import { getAuthMessage, getAuthStatus, getSignedUpStatus } from 'src/app/store/account/account.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authState$ = this.store.pipe(select(getAuthStatus))

  constructor(private store: Store) { }

  ngOnInit(): void {
  }


}

