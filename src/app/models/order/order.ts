import { Status } from 'src/app/enums/status-type';
import { User } from '../user/user';
import { Payment } from './payment';

export interface Order{
  id: number
  userId: string
  user: User
  date: Date
  paymentId: number
  payment: Payment
  status: Status
}
