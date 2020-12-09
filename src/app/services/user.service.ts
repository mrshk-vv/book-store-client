import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { PagedResponce } from '../models/common/paged-responce';
import { PaginationQuery } from '../models/common/pagination-query';
import { UserFilter } from '../models/filters/user.filter';
import { User } from '../models/user/user';
import { UserSignUp } from '../models/user/user-sign-up';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userBaseUrl = `${environment.apiBaseUrl}/api/User`

  constructor(private http: HttpClient) { }

  getUser(id: string){
    return this.http.get<User>(`${this.userBaseUrl}/getUser`, {params: {id: id}})
  }

  getUsers(paginationQuery: PaginationQuery, filter: UserFilter): Observable<PagedResponce>{
    let params = new HttpParams()
                  .set('pageNumber', paginationQuery.pageNumber.toString())
                  .set('pageSize', paginationQuery.pageSize.toString())

    if(filter != null){
      if(filter.name != null){
        params = params.append('name', filter.name)
      }
      if(filter.status != null){
        params = params.append('status', filter.status.toString())
      }
    }

    return this.http.get<PagedResponce>(`${this.userBaseUrl}/getUsers`, {params: params})
  }

  editUser(user: UserSignUp): Observable<User> {
    return this.http.post<User>(`${this.userBaseUrl}/updateUser`, user)
  }

  deleteUser(id: string){
    const options = {
      params: {
        id: id
      }
    }
    return this.http.post(`${this.userBaseUrl}/deleteUser`, null, options)
  }

  changeUserBlockStatus(id: string): Observable<User>{
    const options = {
      params: {
        id: id
      }
    }
    return this.http.post<User>(`${this.userBaseUrl}/changeUserBlockStatus`, null, options)
  }
}
