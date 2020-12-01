import { HttpClient } from '@angular/common/http';
import { Token } from 'src/app/models/tokens';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSignUp } from '../models/user/user-sign-up';
import { map, tap } from 'rxjs/internal/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthData } from '../models/auth-data';

export const ACCESS_TOKEN_KEY = 'bookstore_access_token'
export const REFRESH_TOKEN_KEY = 'bookstore_refresh_token'


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountBaseUrl = `${environment.apiBaseUrl}/api/Account`

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  get getAccessToken(){
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }

  singIn(body: {email: string, password: string}) : Observable<AuthData>{
    return this.http.post<Token>(`${this.accountBaseUrl}/SignIn`, body).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken);
      }),
      map(res => {
        return this.jwtHelper.decodeToken(res.accessToken)
      })
    )
  }

  signUp(account: UserSignUp){
    return this.http.post<string>(`${this.accountBaseUrl}/SignUp`, account)
  }

  confrimEmail(email: string, code: string){
    return this.http.post(`${this.accountBaseUrl}/ConfirmEmail`, null , {params: {email, code}})
  }

  signOut(){
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    return this.http.post(`${this.accountBaseUrl}/SignOut`, null)
  }

  forgetPassword(body: {email: string}){
    return this.http.post<string>(`${this.accountBaseUrl}/ResetPassword`, body)
  }

  refreshTokens(tokens: Token): Observable<AuthData>{
    return this.http.post<Token>(`${this.accountBaseUrl}/RefreshingTokens`, tokens).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken)
      }),
      map(
        res => {
          return this.jwtHelper.decodeToken(res.accessToken)
        })
      )
  }
}
