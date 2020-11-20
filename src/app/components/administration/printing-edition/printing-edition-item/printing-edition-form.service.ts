import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/models/author/Author';
import { PrintingEdition } from 'src/app/models/PrintingEdition/PrintingEdition';

@Injectable({
  providedIn: 'root'
})
export class PrintingEditionFormService {

  printingEditionForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    description: new FormControl(null, Validators.maxLength(1000)),
    editionType: new FormControl(0, [Validators.required]),
    authors: new FormControl(null, Validators.required),
    price: new FormControl('', Validators.required),
    editionCurrency: new FormControl(0, Validators.required),
    isRemoved: new FormControl(null)
  })

  constructor() {}

  initalizePrintingEditionForm(){
    this.printingEditionForm.setValue({
      id: 0,
      title: null,
      description: null,
      editionType: null,
      authors: null,
      price: '0.00',
      editionCurrency: null,
      isRemoved: false
    })
  }

  populatePrintingEditionForm(printingEdition: PrintingEdition){
      this.printingEditionForm.setValue({
        id: printingEdition.id,
        title: printingEdition.title,
        description: printingEdition.description,
        editionType: printingEdition.editionType.toString(),
        authors: printingEdition.authorInPrintingEditions.map(a => a.authorId),
        price: printingEdition.price,
        editionCurrency: printingEdition.editionCurrency.toString(),
        isRemoved: printingEdition.isRemoved
      })
      console.log(this.authorsList.value)
  }

  get id(){
    return this.printingEditionForm.get('id') as FormControl
  }

  get title(){
    return this.printingEditionForm.get('title') as FormControl
  }

  get description(){
    return this.printingEditionForm.get('description') as FormControl
  }

  get typeValue(){
    return this.printingEditionForm.get('editionType') as FormControl
  }

  get authorsList(){
    return this.printingEditionForm.get('authors') as FormControl
  }

  get price(){
    return this.printingEditionForm.get('price') as FormControl
  }

  get currencyValue(){
    return this.printingEditionForm.get('editionCurrency') as FormControl
  }

  get isRemoved(){
    return this.printingEditionForm.get('isRemoved') as FormControl
  }
}
