import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Author } from 'src/app/models/author/author';
import { deleteAuthor, getAuthors } from 'src/app/store/author/author.actions';
import { getAuthorsSelector,
         getPreviousPageSelector,
         getNextPageSelector,
         getPageSizeSelector
 } from 'src/app/store/author/author.selector';

import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AuthorItemComponent } from './author-item/author-item.component';
import { getPageNumberSelector } from 'src/app/store/author/author.selector';
import { AuthorFormService } from '../../../services/form-services/author-form.service';
import { AuthorState } from 'src/app/store/author/author.reducer';
import { AuthorFilter } from 'src/app/models/filters/author.filter';



@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'products', 'actions'];

  authors: Author[]

  pageNumber: number
  pageSize: number

  searchStringVisible: boolean
  searchString: string

  filter: AuthorFilter

  nextPage: boolean = false
  previousPage: boolean = true


  constructor(private store: Store<AuthorState>,
              private dialog: MatDialog,
              private formService: AuthorFormService) { }

  ngOnInit(): void {
    this.store.pipe(select(getPageNumberSelector)).subscribe(
      data => {
        this.pageNumber = data
      }
    )
    this.store.pipe(select(getPageSizeSelector)).subscribe(
      data => {
        this.pageSize = data
      }
    )
    this.store.dispatch(getAuthors({
      paginationQuery: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }, filter: null}))
    this.store.pipe(select(getAuthorsSelector)).subscribe(
      data => {
        this.authors = data
      }
    )
  }

  addAuthor(){
    this.formService.initalizeAuthorForm()
    this.dialog.open(AuthorItemComponent)
  }

  editAuthor(author: Author){
    this.formService.populateAuthorForm(author)
    this.dialog.open(AuthorItemComponent)
  }

  deleteAuthor(author: Author){
    this.store.dispatch(deleteAuthor({id: author.id}))
  }

  openNextPage(){
    if(this.availabilityNextPage()){
      this.store.dispatch(getAuthors({paginationQuery: {
        pageNumber: this.pageNumber + 1,
        pageSize: this.pageSize
      }, filter: null}))
      this.store.pipe(select(getAuthorsSelector)).subscribe(
        data => {
            this.authors = data
            if(data.length < this.pageSize){
              this.nextPage = true
            }
        }
      )
    }
  }

  openPreviousPage(){
    if(this.availabilityPreviousPage()){
      this.store.dispatch(getAuthors({paginationQuery: {
        pageNumber: this.pageNumber - 1,
        pageSize: this.pageSize
      }, filter: null}))
      this.store.pipe(select(getAuthorsSelector)).subscribe(
        data => {
            this.authors = data
        }
      )
    }
  }

  changeTableSize(){
    this.store.dispatch(getAuthors({paginationQuery: {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }, filter: null}))
    this.store.pipe(select(getAuthorsSelector)).subscribe(
      data => {
        this.authors = data
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
        }else{
          this.nextPage = false
          return false
        }
      }
    )
    this.nextPage = false
    return true
  }

  applyFilter(){
    this.filter = {
      name: this.searchString
    }
    this.store.dispatch(getAuthors({
      paginationQuery: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      },
      filter: this.filter
  }))
  this.searchStringVisible = false
  this.searchString = null
  }
}
