import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/internal/operators';
import { environment } from 'src/environments/environment';
import { PagedResponce } from '../models/common/paged-responce';
import { PaginationQuery } from '../models/common/pagination-query';

import { PrintingEdition } from '../models/printingEdition/printing-edition';
import { PrintingEditionItem } from '../models/printingEdition/printing-edition-item';
import { PrintingEditionFilter } from '../shared/filters/printing-edition.filter';

@Injectable({
  providedIn: 'root'
})
export class PrintingEditionService {

  printingEditionBaseUrl = `${environment.apiBaseUrl}/api/PrintingEdition`

  constructor(private http: HttpClient) { }

  getPrintingEdition(id: string){
    return this.http.get<PrintingEdition>(`${this.printingEditionBaseUrl}/getEdition`, {params: {id}})
  }

  getPrintingEditions(paginationQuery?: PaginationQuery, filter?: PrintingEditionFilter): Observable<PagedResponce> {
    let params = new HttpParams()
                .set('pageNumber', paginationQuery.pageNumber.toString())
                .set('pageSize', paginationQuery.pageSize.toString())

    if(filter != null || filter != undefined){
      if(filter.searchString != null){
        params = params.append('searchString', filter.searchString)
      }
      if(filter.types != null){
        for(let type of filter.types){
          params = params.append('types', type.toString())
        }
      }
      if(filter.maxPrice != null){
        params = params.append('maxPrice', filter.maxPrice.toString())
      }
      if(filter.minPrice != null){
        params = params.append('minPrice', filter.minPrice.toString())
      }
      if(filter.currency != null){
        params = params.append('currency', filter.currency.toString())
      }
      if(filter.sort != null){
        params = params.append('sort', filter.sort.toString())
      }
    }

    return this.http.get<PagedResponce>(`${this.printingEditionBaseUrl}/getEditions`, {params: params})
  }

  addPrintingEdition(printingEdition: PrintingEditionItem): Observable<PrintingEdition>{
    return this.http.post<PrintingEdition>(`${this.printingEditionBaseUrl}/createEdition`, printingEdition)
  }

  updatePrintingEdition(printingEdition: PrintingEditionItem): Observable<PrintingEdition>{
    return this.http.post<PrintingEdition>(`${this.printingEditionBaseUrl}/updateEdition`, printingEdition)
  }

  removePrintingEdition(id: string){
    return this.http.post<PrintingEdition>(`${this.printingEditionBaseUrl}/removeEdition`, id)
  }

  deletePrintingEdition(id: number){
    var curId = id.toString()
    const options = {
      params: {
        id: curId
      }
    }
    return this.http.post<PrintingEdition>(`${this.printingEditionBaseUrl}/deleteEdition`, null, options)
  }

}
