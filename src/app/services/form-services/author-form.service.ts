import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/models/author/author';
import { AuthorItem } from 'src/app/models/author/author-item';
import { PrintingEdition } from 'src/app/models/printingEdition/printing-edition';

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
    this.authorForm.setValue({
      id: author.id,
      name: author.name,
      isRemoved: author.isRemoved,
      printingEditions: author.authorInPrintingEditions.map(pe => pe.printingEdition.id)
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


