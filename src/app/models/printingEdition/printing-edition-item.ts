import { Currency } from 'src/app/enums/CurrencyType'
import { Edition } from 'src/app/enums/EditionType'
import { Author } from '../author/author'

export class PrintingEditionItem{
  id?: number
  title: string
  description: string
  price: number
  editionType: Edition
  editionCurrency: Currency
  isRemoved?: boolean
  authors: Array<number>
}
