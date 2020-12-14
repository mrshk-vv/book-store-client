import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Order } from 'src/app/models/order/order';
import { payOrder } from 'src/app/store/order/order.actions';
import { OrderState } from 'src/app/store/order/order.reducer';
import { getOrderSelector } from 'src/app/store/order/order.selector';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnDestroy, AfterViewInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;
      order: Order
      _totalAmount: number;
      card: any;
      cardHandler = this.onChange.bind(this);
      cardError: string;
  constructor(
          private cd: ChangeDetectorRef,
          private dialogRef: MatDialogRef<PaymentComponent>,
          private store : Store<OrderState>
      ) {
        store.pipe(select(getOrderSelector)).subscribe(
          order => {
            this.order = order
          }
        )
        this._totalAmount = this.order.totalAmount
      }
  ngOnDestroy() {
          if (this.card) {
              this.card.removeEventListener('change', this.cardHandler);
              this.card.destroy();
          }
      }
  ngAfterViewInit() {
          this.initiateCardElement();
      }
  initiateCardElement() {
          const cardStyle = {
              base: {
                  color: '#32325d',
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  fontSmoothing: 'antialiased',
                  fontSize: '16px',
                  '::placeholder': {
                      color: '#aab7c4',
                  },
              },
              invalid: {
                  color: '#fa755a',
                  iconColor: '#fa755a',
              },
          };
          this.card = elements.create('card', {hidePostalCode: true, style: cardStyle});
          this.card.mount(this.cardInfo.nativeElement);
  this.card.addEventListener('change', this.cardHandler);
      }
  onChange({error}) {
          if (error) {
              this.cardError = error.message;
          } else {
              this.cardError = null;
          }
          this.cd.detectChanges();
      }
  async createStripeToken() {
          const {token, error} = await stripe.createToken(this.card);
          if (token) {
              this.store.dispatch(payOrder({stripeToken: token.id, order: this.order}))
              this.dialogRef.close()
          } else {
              this.onError(error);
          }
      }
  onError(error) {
          if (error.message) {
              this.cardError = error.message;
          }
      }

}
