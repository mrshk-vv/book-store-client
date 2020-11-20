import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { PrintingEdition } from 'src/app/models/PrintingEdition/PrintingEdition';
import { deletePrintingEdition, getPrintingEditions } from 'src/app/store/printing-edition/printing-edition.actions';
import { getPageSizeSelector,
         getPrintingEditionsSelector,
         getPageNumberSelector,
         getNextPageSelector,
         getPreviousPageSelector
      } from 'src/app/store/printing-edition/printing-edition.selector';
import { PrintingEditionItemComponent } from './printing-edition-item/printing-edition-item.component';
import { PrintingEditionFormService } from './printing-edition-item/printing-edition-form.service';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { SpinnerService } from '../../shared/spinner-view/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


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

  printingEditions: MatTableDataSource<any>

  pageSize: number
  pageNumber: number


  nextPage: boolean = false
  previousPage: boolean = true

  constructor(private store: Store,
              private dialog: MatDialog,
              private peFormService: PrintingEditionFormService,
              ) { }

  ngOnInit(): void {
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
    this.store.dispatch(getPrintingEditions({paginationQuery: {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    },
    filter: null}))
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
      }, filter: null}))
      this.store.pipe(select(getPrintingEditionsSelector)).subscribe(
        data => {
            this.printingEditions = new MatTableDataSource(data)
            this.printingEditions.sort = this.sort
            if(data.length < this.pageSize){
              this.nextPage = true
            }
        }
      )
    }
  }

  openPreviousPage(){
    if(this.availabilityPreviousPage()){
      this.store.dispatch(getPrintingEditions({paginationQuery: {
        pageNumber: this.pageNumber - 1,
        pageSize: this.pageSize
      }, filter: null}))
      this.store.pipe(select(getPrintingEditionsSelector)).subscribe(
        data => {
            this.printingEditions = new MatTableDataSource(data)
            this.printingEditions.sort = this.sort
        }
      )
    }
  }

  changeTableSize(){
    this.store.dispatch(getPrintingEditions({paginationQuery: {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }, filter: null}))
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
}
