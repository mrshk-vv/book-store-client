import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';

import { Currency } from 'src/app/enums/CurrencyType';
import { Edition } from 'src/app/enums/EditionType';
import { Author } from 'src/app/models/author/Author';
import { AuthorInPrintingEdition } from 'src/app/models/author/AuthorInPrintingEdition';
import { PrintingEdition } from 'src/app/models/PrintingEdition/PrintingEdition';

import { getAuthors } from 'src/app/store/author/author.actions';
import { getAuthorsSelector } from 'src/app/store/author/author.selector';
import { addPrintingEdition, updatePrintingEdition } from 'src/app/store/printing-edition/printing-edition.actions';
import { PrintingEditionFormService } from './printing-edition-form.service';


@Component({
  selector: 'app-printing-edition-item',
  templateUrl: './printing-edition-item.component.html',
  styleUrls: ['./printing-edition-item.component.css']
})

export class PrintingEditionItemComponent implements OnInit {

  keysEdition: string[];
  edition = Edition;

  keysCurrency: string[];
  currency = Currency;

  authors: Author[];

  constructor(private store: Store,
              public formService: PrintingEditionFormService,
              private dialogRef: MatDialogRef<PrintingEditionItemComponent>,
              ){}

  ngOnInit(): void {
    this.store.dispatch(getAuthors({
      paginationQuery: {
        pageNumber: 0,
        pageSize: 0
    }}))
    this.store.pipe(select(getAuthorsSelector)).subscribe(
      res => {
        this.authors = res
      }
    )
    this.keysEdition = Object.keys(this.edition).filter(Number);
    this.keysCurrency = Object.keys(this.currency).filter(Number);
  }


  onSubmit(){
    if(this.formService.printingEditionForm.valid){
      let authorsIds: Array<number> = this.formService.authorsList.value

      let printingEdition: PrintingEdition = {
        id: this.formService.id.value,
        title: this.formService.title.value,
        description: this.formService.description.value,
        price: this.formService.price.value,
        editionType: this.formService.typeValue.value,
        editionCurrency: this.formService.currencyValue.value,
      }

      var authorInPE : Array<AuthorInPrintingEdition> = []

      for (let i = 0; i < authorsIds.length; i++) {
        authorInPE.push({
          authorId: authorsIds[i],
          printingEditionId: this.formService.id.value
        })
      }

      printingEdition.authorInPrintingEditions = authorInPE

      console.log(printingEdition)
      if(this.formService.id.value === 0){
        this.store.dispatch(addPrintingEdition(printingEdition))
      }else{
        this.store.dispatch(updatePrintingEdition(printingEdition))
      }
      this.onClose()
    }
  }

  onClose(){
    this.formService.printingEditionForm.reset()
    this.formService.initalizePrintingEditionForm()
    this.dialogRef.close()
  }
}
