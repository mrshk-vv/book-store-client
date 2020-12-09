import { Currency } from '../../enums/currency-type'
import { Edition } from '../../enums/edition-type'
import { AuthorInPrintingEdition } from '../author/author-In-printing-edition'

export class PrintingEdition{
  id?: number
  title: string
  description: string
  price: number
  editionType: Edition
  editionCurrency: Currency
  isRemoved?: boolean
  authorInPrintingEditions?: AuthorInPrintingEdition[]
}
