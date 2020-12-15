import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Currency } from 'src/app/enums/currency-type';
import { Edition } from 'src/app/enums/edition-type';

import { PrintingEdition } from 'src/app/models/printingEdition/printing-edition';
import { getPrintingEditions } from 'src/app/store/printing-edition/printing-edition.actions';
import { PrintingEditionState } from 'src/app/store/printing-edition/printing-edition.reducer';
import * as selectors from 'src/app/store/printing-edition/printing-edition.selector'
import * as alertify from 'alertifyjs'
import { PrintingEditionFilter } from 'src/app/shared/filters/printing-edition.filter';

@Component({
  selector: 'app-printing-edition-list',
  templateUrl: './printing-edition-list.component.html',
  styleUrls: ['./printing-edition-list.component.css']
})
export class PrintingEditionListComponent implements OnInit {

  pageSize: number
  pageNumber: number

  nextPage: boolean = false
  previousPage: boolean = true

  filter: PrintingEditionFilter = {
    searchString: null
  }

  keysCurrency: string[];
  currency = Currency;

  printingEditions: PrintingEdition[]

  categories = this.formBuilder.group({
    book: false,
    journal: false,
    newspaper: false
  })

  priceRange = this.formBuilder.group({
    min: null,
    max: null,
  })

  searchBlock = this.formBuilder.group({
    searchString: '',
    currency: null,
    sort: null,
  })

  constructor(private store: Store<PrintingEditionState>,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.keysCurrency = Object.keys(this.currency).filter(Number);

    this.store.pipe(select(selectors.getPageSizeSelector)).subscribe(
      data => {
        this.pageSize = data
      }
    )
    this.store.pipe(select(selectors.getPageNumberSelector)).subscribe(
      data => {
        this.pageNumber = data
      }
    )

    this.store.dispatch(getPrintingEditions({
      paginationQuery:{
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      },
      filter: null
    }))
    this.store.pipe(select(selectors.getPrintingEditionsSelector)).subscribe(
      data => {
        this.printingEditions = data
      }
    )
  }

  printingEditionDetail(id: number){
    this.router.navigate(['/printing-edition/detail',id])
  }

  openNextPage(){
    if(this.availabilityNextPage()){
      this.store.dispatch(getPrintingEditions({paginationQuery: {
        pageNumber: this.pageNumber + 1,
        pageSize: this.pageSize
      }, filter: this.filter}))
      this.store.pipe(select(selectors.getPrintingEditionsSelector))
    }
  }

  openPreviousPage(){
    if(this.availabilityPreviousPage()){
      this.store.dispatch(getPrintingEditions({paginationQuery: {
        pageNumber: this.pageNumber - 1,
        pageSize: this.pageSize
      }, filter: this.filter}))
      this.store.pipe(select(selectors.getPrintingEditionsSelector))
    }
  }

  availabilityNextPage(): boolean{
    this.store.pipe(select(selectors.getNextPageSelector)).subscribe(
      data => {
        if(data === null){
          this.nextPage = true
          return true;
        }else{
          this.nextPage = false
          return false
        }
      }
    )
    this.previousPage = false
    return true
  }

  availabilityPreviousPage(): boolean{
    this.store.pipe(select(selectors.getPreviousPageSelector)).subscribe(
      data => {
        if(data === null){
          this.previousPage = true
          return true
        }
        else{
          this.nextPage = false
          return false
        }
      }
    )
    this.nextPage = false
    return true
  }

  applyFilter(){
    let types: Array<Edition> = []
    if(this.categories.get('book').value){
      if(!types.includes(Edition.Book)){
        types.push(Edition.Book)
      }
    }
    if(this.categories.get('journal').value){
      if(!types.includes(Edition.Journal)){
        types.push(Edition.Journal)
      }
    }
    if(this.categories.get('newspaper').value){
      if(!types.includes(Edition.Newspaper)){
        types.push(Edition.Newspaper)
      }
    }

    this.filter = {
      searchString: this.searchBlock.get('searchString').value,
      types: types,
      minPrice: this.priceRange.get('min').value,
      maxPrice: this.priceRange.get('max').value,
      currency: this.searchBlock.get('currency').value,
      sort: this.searchBlock.get('sort').value
    }

    this.store.dispatch(getPrintingEditions({
      paginationQuery: {
        pageNumber: 1,
        pageSize: this.pageSize
      },
      filter: this.filter
    }))
  }
}
