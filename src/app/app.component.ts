import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { select, Store } from '@ngrx/store';
import { AuthData } from './models/auth-data';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './services/account.service';
import { refreshTokens } from './store/account/account.actions';
import { getAuthStatus } from './store/account/account.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'book-store-client';
  authState: boolean;

  constructor(){}

  ngOnInit(): void {
    // console.log('now')
    // var accessToken: string = localStorage.getItem(ACCESS_TOKEN_KEY)
    // var refreshToken: string = localStorage.getItem(REFRESH_TOKEN_KEY)

    // if(accessToken != null && refreshToken != null){
    //   if(!(this.jwt.isTokenExpired(accessToken))){
    //     this.store.dispatch(refreshTokens({
    //       accessToken: accessToken,
    //       refreshToken: refreshToken
    //     }))
    //   }
    // }
  }
}
