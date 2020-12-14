import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { PrintingEdition } from 'src/app/models/printingEdition/printing-edition';
import { deletePrintingEdition, getPrintingEditions } from 'src/app/store/printing-edition/printing-edition.actions';
import { getPageSizeSelector,
         getPrintingEditionsSelector,
         getPageNumberSelector,
         getNextPageSelector,
         getPreviousPageSelector
      } from 'src/app/store/printing-edition/printing-edition.selector';
import { PrintingEditionItemComponent } from './printing-edition-item/printing-edition-item.component';
import { PrintingEditionFormService } from '../../../services/form-services/printing-edition-form.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PrintingEditionState } from 'src/app/store/printing-edition/printing-edition.reducer';
import { Edition } from 'src/app/enums/edition-type';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators';
import { PrintingEditionFilter } from 'src/app/shared/filters/printing-edition.filter';


@Component({
  selector: 'app-printing-edition',
  templateUrl: './printing-edition.component.html',
  styleUrls: ['./printing-edition.component.css']
})

export class PrintingEditionComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort

  dialogConfig: MatDialogConfig = {
    autoFocus: true,
    width: "70%"
  }

  displayedColunms: string[] = ['id','title','description','category','authors','price','actions']

  pageSize: number
  pageNumber: number

  nextPage: boolean = false
  previousPage: boolean = true

  searchStringVisible: boolean = false
  searchString: string

  categoryFilterVisible: boolean = false
  types: Array<Edition> = []
  categories = this.formBuilder.group({
    book: false,
    newspaper: false,
    journal: false
  })

  filter: PrintingEditionFilter

  printingEditions: MatTableDataSource<any>


  constructor(private store: Store<PrintingEditionState>,
              private dialog: MatDialog,
              private peFormService: PrintingEditionFormService,
              private formBuilder: FormBuilder
              ) {}

  ngOnInit(): void {
    this.categories.valueChanges.pipe(
      debounceTime(2000)
    ).subscribe(
      () => this.applyFilter()
    )


    this.store.pipe(select(getPageSizeSelector)).subscribe(
      data => {
        this.pageSize = data
      }
    )
    this.store.pipe(select(getPageNumberSelector)).subscribe(
      data => {
        this.pageNumber = data
      }
    )
    this.store.dispatch(getPrintingEditions({
      paginationQuery: {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }, filter: null}))
    this.store.pipe(select(getPrintingEditionsSelector)).subscribe(
      data => {
        this.printingEditions = new MatTableDataSource(data)
        this.printingEditions.sort = this.sort
      },
    )
  }

  addPrintingEdition(){
    this.peFormService.initalizePrintingEditionForm()
    this.dialog.open(PrintingEditionItemComponent, this.dialogConfig)
  }

  editPrintingEdition(printingEdition: PrintingEdition){
    this.peFormService.populatePrintingEditionForm(printingEdition)
    this.dialog.open(PrintingEditionItemComponent, this.dialogConfig)
  }

  deletePrintingEdition(printingEdition: PrintingEdition){
    this.store.dispatch(deletePrintingEdition({id: printingEdition.id}))
  }

  openNextPage(){
    if(this.availabilityNextPage()){
      this.store.dispatch(getPrintingEditions({paginationQuery: {
        pageNumber: this.pageNumber + 1,
        pageSize: this.pageSize
      }, filter: this.filter}))
      this.store.pipe(select(getPrintingEditionsSelector))
    }
  }

  openPreviousPage(){
    if(this.availabilityPreviousPage()){
      this.store.dispatch(getPrintingEditions({paginationQuery: {
        pageNumber: this.pageNumber - 1,
        pageSize: this.pageSize
      }, filter: this.filter}))
      this.store.pipe(select(getPrintingEditionsSelector))
    }
  }

  changeTableSize(){
    this.store.dispatch(getPrintingEditions({paginationQuery: {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }, filter: this.filter}))
    this.store.pipe(select(getPrintingEditionsSelector)).subscribe(
      data => {
        this.printingEditions = new MatTableDataSource(data)
        this.printingEditions.sort = this.sort
        if(data.length <= this.pageSize){
          this.nextPage = true
        }
        this.nextPage = false
      }
    )
    this.availabilityNextPage()
    this.availabilityPreviousPage()
  }

  availabilityNextPage(): boolean{
    this.store.pipe(select(getNextPageSelector)).subscribe(
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
    this.store.pipe(select(getPreviousPageSelector)).subscribe(
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

  changeCategoryFiltering(){
    this.bookInFilter()
    this.journalInFilter()
    this.newspaperInFilter()
    setTimeout(() => {
      this.categoryFilterVisible = false
      if(this.types === undefined){
        this.types = []
      }
    }, 1000)
  }

  applyFilter(){
    this.filter = {
      searchString: this.searchString,
      types: this.types
    }

    this.store.dispatch(getPrintingEditions({
    paginationQuery:{
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
    },
    filter: this.filter}))
    this.searchStringVisible = false
    this.searchString = null
  }

  newspaperInFilter(){
    if(this.categories.get('newspaper').value){
      if(!this.types.includes(Edition.Newspaper)){
        this.types.push(Edition.Newspaper)
      }
    }
    else{
      this.types = this.types.filter(i => i != Edition.Newspaper)
    }
  }
  bookInFilter(){
    if(this.categories.get('book').value){
      if(!this.types.includes(Edition.Book)){
        this.types.push(Edition.Book)
      }
    }
    else{
      this.types = this.types.filter(i => i != Edition.Book)
    }
  }
  journalInFilter(){
    if(this.categories.get('journal').value){
      if(!this.types.includes(Edition.Journal)){
        this.types.push(Edition.Journal)
      }
    }
    else{
      this.types = this.types.filter(i => i != Edition.Journal)
    }
  }
}
