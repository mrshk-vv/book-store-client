import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Author } from 'src/app/models/author/Author';
import { PrintingEdition } from 'src/app/models/PrintingEdition/PrintingEdition';
import { addAuthor, updateAuthor } from 'src/app/store/author/author.actions';
import { getPrintingEditions } from 'src/app/store/printing-edition/printing-edition.actions';
import { getPrintingEditionsSelector } from 'src/app/store/printing-edition/printing-edition.selector';
import { AuthorFormService } from './author-form.service';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.css']
})
export class AuthorItemComponent implements OnInit {

  printingEditions: PrintingEdition[]

  constructor(private store: Store,
              public formService: AuthorFormService,
              private dialogRef: MatDialogRef<AuthorItemComponent>) { }

  ngOnInit(): void {
    this.store.dispatch(getPrintingEditions({
      paginationQuery: {
        pageNumber: 0,
        pageSize: 0
    }}))

    this.store.pipe(select(getPrintingEditionsSelector)).subscribe(
      data => {
        this.printingEditions = data
      }
    )
  }


  onSubmit(){
    if(this.formService.authorForm.valid){
      let author = this.formService.authorFromForm
      if(this.formService.id.value === 0){
        this.store.dispatch(addAuthor(author))
      }else{
        this.store.dispatch(updateAuthor(author))
      }
      this.onClose()
    }
  }

  onClose(){
    this.formService.authorForm.reset()
    this.formService.initalizeAuthorForm()
    this.dialogRef.close()
  }
}
