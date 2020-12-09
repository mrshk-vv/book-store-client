import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PrintingEdition } from 'src/app/models/printingEdition/printing-edition';
import { CartService } from 'src/app/services/cart.service';
import { getPrintingEdition } from 'src/app/store/printing-edition/printing-edition.actions';
import { PrintingEditionState } from 'src/app/store/printing-edition/printing-edition.reducer';
import { getPrintingEditionSelector } from 'src/app/store/printing-edition/printing-edition.selector';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-printing-edition-detail',
  templateUrl: './printing-edition-detail.component.html',
  styleUrls: ['./printing-edition-detail.component.css']
})
export class PrintingEditionDetailComponent implements OnInit {

  id: number
  printingEdition: PrintingEdition
  private subscription: Subscription

  quantity: number = 1

  constructor(private activeRoute: ActivatedRoute,
              private store: Store<PrintingEditionState>,
              private cart: CartService) {
                this.subscription = activeRoute.params.subscribe(params => this.id = params['id']);
              }


  ngOnInit(): void {
    this.store.dispatch(getPrintingEdition({id: this.id}))
    this.store.pipe(select(getPrintingEditionSelector)).subscribe(
      data => {
        this.printingEdition = data
      }
    )
  }

  addProduct(){
    this.cart.addProduct(this.printingEdition, this.quantity)
    alertify.success(`${this.printingEdition.title} added to Cart`)
  }

}
