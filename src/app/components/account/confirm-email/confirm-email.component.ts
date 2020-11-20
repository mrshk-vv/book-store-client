import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as accountActions from 'src/app/store/account/account.actions';
import { getConfrimEmailStatus } from 'src/app/store/account/account.selector';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  confirmEmailStatus$ = this.store.pipe(select(getConfrimEmailStatus))
  urlParams: any = {}

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.urlParams.code = this.route.snapshot.queryParamMap.get('code')
    this.urlParams.email = this.route.snapshot.queryParamMap.get('email')
    this.confrimEmail()
  }

  confrimEmail(){
    this.store.dispatch(accountActions.confirmEmail(this.urlParams))
  }

}
