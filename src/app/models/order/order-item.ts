import { Currency } from 'src/app/enums/currency-type';
import { PrintingEdition } from '../printingEdition/printing-edition';
import { Order } from './order';

export interface OrderItem{
  id: number
  amount: number
  currency: Currency
  printingEditionId: number
  printingEdition: PrintingEdition
  orderId?: number
  order: Order
}
