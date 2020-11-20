import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/models/author/Author';
import { AuthorItem } from 'src/app/models/author/AuthorItem';
import { PrintingEdition } from 'src/app/models/PrintingEdition/PrintingEdition';

@Injectable({
  providedIn: 'root'
})
export class AuthorFormService {

  authorForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    printingEditions: new FormControl(null),
    isRemoved: new FormControl(false)
  })

  constructor() { }

  initalizeAuthorForm(){
    this.authorForm.setValue({
      id: 0,
      name: null,
      isRemoved: false,
      printingEditions: null
    })
  }

  populateAuthorForm(author: Author){
    let printingEditions = new Array<PrintingEdition>()
    for (let i = 0; i < author.authorInPrintingEditions.length; i++) {
      printingEditions.push({
        id: author.authorInPrintingEditions[i].printingEditionId,
        title: author.authorInPrintingEditions[i].printingEdition.title,
        description: author.authorInPrintingEditions[i].printingEdition.description,
        editionCurrency: author.authorInPrintingEditions[i].printingEdition.editionCurrency,
        editionType: author.authorInPrintingEditions[i].printingEdition.editionType,
        price: author.authorInPrintingEditions[i].printingEdition.price,
        authorInPrintingEditions: author.authorInPrintingEditions
      })

    }
    this.authorForm.setValue({
      id: author.id,
      name: author.name,
      isRemoved: author.isRemoved,
      printingEditions: printingEditions
    })
  }

  get id(){
    return this.authorForm.get('id') as FormControl
  }

  get name(){
    return this.authorForm.get('name') as FormControl
  }

  get printingEditionList(){
    return this.authorForm.get('printingEditions') as FormControl
  }

  get isRemoved(){
    return this.authorForm.get('isRemoved') as FormControl
  }

  get authorFromForm(): AuthorItem{
    return {
      id: this.id.value,
      name: this.name.value,
      printingEditions: this.printingEditionList.value,
      isRemoved: this.isRemoved.value
    }
  }
}


