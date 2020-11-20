import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagedResponce } from '../models/common/PagedResponce';
import { PaginationQuery } from '../models/common/PaginationQuery';
import { PrintingEditionFilter } from '../models/filters/PrintingEditionFilter';
import { PrintingEdition } from '../models/PrintingEdition/PrintingEdition';

@Injectable({
  providedIn: 'root'
})
export class PrintingEditionService {

  printingEditionBaseUrl = `${environment.apiBaseUrl}/api/PrintingEdition`

  constructor(private http: HttpClient) { }

  getPrintingEdition(id: string){
    return this.http.get(`${this.printingEditionBaseUrl}/getEdition`, {params: {id}})
  }

  getPrintingEditions(paginationQuery: PaginationQuery, filter?: PrintingEditionFilter): Observable<PagedResponce> {
    const params = new HttpParams()
                .set('pageNumber', paginationQuery.pageNumber.toString())
                .set('pageSize', paginationQuery.pageSize.toString())

    return this.http.get<PagedResponce>(`${this.printingEditionBaseUrl}/getEditions`, {params: params})
  }

  addPrintingEdition(printingEdition: PrintingEdition){
    return this.http.post<PrintingEdition>(`${this.printingEditionBaseUrl}/createEdition`, printingEdition)
  }

  updatePrintingEdition(printingEdition: PrintingEdition){
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
