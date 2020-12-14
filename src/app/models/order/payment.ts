import { Order } from './order';

export interface Payment{
  order: Order,
  token: string
}
