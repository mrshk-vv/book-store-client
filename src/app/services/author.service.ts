import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../models/author/Author';
import { PagedResponce } from '../models/common/PagedResponce';
import { PaginationQuery } from '../models/common/PaginationQuery';
import { AuthorFilter } from '../models/filters/AuthorFilter';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

constructor(private http: HttpClient) { }

  authorBaseUrl = `${environment.apiBaseUrl}/api/Author`

  public getAuthor(id: number){
    return this.http.get<Author>(`${this.authorBaseUrl}/getAuthor`, {params: {id: id.toString()}})
  }

  public getAuthors(paginationQuery?: PaginationQuery, filter?: AuthorFilter): Observable<PagedResponce>{
    const params = new HttpParams()
                  .set('pageNumber', paginationQuery.pageNumber.toString())
                  .set('pageSize', paginationQuery.pageSize.toString())
    return this.http.get<PagedResponce>(`${this.authorBaseUrl}/getAuthors`, {params: params})
  }

  public getAuthorsList(){
    return this.http.get<Author[]>(`${this.authorBaseUrl}/getAuthorsList`)
  }

  public addAuthor(authorToAdd: Author): Observable<Author>{
    return this.http.post<Author>(`${this.authorBaseUrl}/createAuthor`, authorToAdd)
  }

  public updateAuthor(authorToUpdate: Author): Observable<Author>{
    return this.http.post<Author>(`${this.authorBaseUrl}/updateAuthor`, authorToUpdate)
  }

  public removeAuthor(id: number): Observable<Author>{
    return this.http.post<Author>(`${this.authorBaseUrl}/removeAuthor`, id)
  }

  public deleteAuthor(id: number){
    const options = {
      params: {
        id: id.toString()
      }
    }
   return this.http.post(`${this.authorBaseUrl}/deleteAuthor`, null, options )
  }

}
